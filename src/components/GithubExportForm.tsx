import React, { useState } from 'react';
import { TaskCard } from '../models/Types';
import { Modal, ProgressBar } from 'react-bootstrap';
import { Octokit } from "@octokit/rest";
import { throttling } from "@octokit/plugin-throttling";

interface GithubExportProps {
  taskMap: Map<string, TaskCard[]>;
  numTasks: number;
  showForm: boolean;
  hideForm: Function;
}

const GithubExportForm: React.FunctionComponent<GithubExportProps> = ({ taskMap, numTasks, showForm, hideForm }) => {
  const [authToken, setAuthToken] = useState("");
  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [progress, setProgress] = useState(0);
  const [failureLog, setFailureLog] = useState(Array<any>());
  const categories = Array.from(taskMap.keys());

  const handleGithubExport = () => {
    const Throttlekit = Octokit.plugin(throttling);
    const octokit = new Throttlekit({
      auth: authToken,
      throttle: {
        onRateLimit: (retryAfter: any, options: any, octokit: any) => {
          octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`);
          if (options.request.retryCount === 0) {
            // only retries once
            octokit.log.info(`Retrying after ${retryAfter} seconds!`);
            return true;
          }
        },
        onAbuseLimit: (retryAfter: any, options: any, octokit: any) => {
          // does not retry, only logs a warning
          octokit.log.warn(`Abuse detected for request ${options.method} ${options.url}`);
        },
      },
    });
    let numFinished = 0;
    for (const category of categories) {
      const taskCards = taskMap.get(category) ?? [];
      for (const card of taskCards) {
        for (const task of card.tasks) {
          octokit.issues.create({
            owner: repoOwner,
            repo: repoName,
            title: `${category}: ${task.name}`,
            body: task.details
          }).then(() => {
            console.log("Issue creation succeded");
          }).catch((reason) => {
            console.log("Issue creation failed", reason);
            setFailureLog([...failureLog, reason]);
          }).finally(() => {
            numFinished += 1;
            setProgress(Math.ceil(numFinished / numTasks * 100));
          });
        }
      }
    }
  }

  return (
    <Modal show={showForm} onHide={() => hideForm()}>
      <Modal.Header closeButton>
        <Modal.Title>Github Export</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>This form will export your survey results to issues on your GitHub repository.</p>
          <p>Go to the <a href="https://github.com/settings/tokens">token section of GitHub Developer Settings</a> to generate a personal access token.</p>
        </div>
        <form onSubmit={handleGithubExport}>
          <label>Repo owner: <input type="text" value={repoOwner} onChange={(event) => setRepoOwner(event.target.value)} /></label>
          <label>Repo name: <input type="text" value={repoName} onChange={(event) => setRepoName(event.target.value)} /></label>
          <label>Personal access token: <input type="text" value={authToken} onChange={(event) => setAuthToken(event.target.value)} /></label>
        </form>
        {progress > 0 ? (
          <>
            <span>{progress}% complete</span>
            <ProgressBar variant="info" now={progress} />
          </>
        ) : null}
        {failureLog.map((failure) => 
          (<div style={{color: "red"}}>[Error] {`${failure}`}</div>)
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="blue-button" onClick={() => hideForm()}>
          Close
        </button>
        <button className="blue-button" onClick={handleGithubExport}>
          Export
        </button>
      </Modal.Footer>
    </Modal>)
}

export default GithubExportForm;