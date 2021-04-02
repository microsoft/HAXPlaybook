import React, { useState } from 'react';
import { TaskCard } from '../models/Types';
import { Octokit } from "@octokit/rest";
import { throttling } from "@octokit/plugin-throttling";
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';

// Fluent UI props
const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};
const dialogContentProps = {
  type: DialogType.largeHeader,
  title: 'Github Export',
};

interface GithubExportProps {
  taskMap: Map<string, TaskCard[]>;
  numTasks: number;
  showForm: boolean;
  onClose: Function;
}

const GithubExportForm: React.FunctionComponent<GithubExportProps> = ({ taskMap, numTasks, showForm, onClose }) => {
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

    // Counts the number of finished promises
    // The count has to be wrapped in a closure to avoid race conditions
    // Fixes eslint no-loop-func warning
    function progressIncrementer() {
      let numFinished = 0;
      function update() {
        numFinished += 1;
        setProgress(numFinished / numTasks);
      }
      return update;
    }

    let updateProgress = progressIncrementer();
    for (const category of categories) {
      const taskCards = TaskCard.filterTasks(taskMap.get(category) ?? []);
      for (const card of taskCards) {
        for (const task of card.tasks) {
          let title = `${category}: ${task.name}`;
          octokit.issues.create({
            owner: repoOwner,
            repo: repoName,
            title: title,
            body: task.details
          }).then(() => {
            console.log("Issue creation succeded", title);
          }).catch((reason) => {
            console.log("Issue creation failed", reason);
            setFailureLog([...failureLog, reason]);
          }).finally(() => {
            updateProgress();
          });
        }
      }
    }
  }

  return (
    <Dialog
      hidden={!showForm}
      onDismiss={() => onClose()}
      dialogContentProps={dialogContentProps}
      modalProps={modelProps}
    >
      <div>
        <p>This form will export your survey results to issues on your GitHub repository.</p>
        <p>Go to the <a href="https://github.com/settings/tokens">token section of GitHub Developer Settings</a> to generate a personal access token.</p>
      </div>
      <TextField label="Repo owner" onChange={(_, newValue) => setRepoOwner(newValue ?? "")}  />
      <TextField label="Repo name" onChange={(_, newValue) => setRepoName(newValue ?? "")}  />
      <TextField label="Personal access token" onChange={(_, newValue) => setAuthToken(newValue ?? "")}  />
      {progress > 0 ? (
        <ProgressIndicator label="Creating issues" description="Issues are being created in your Github repository" percentComplete={progress} />
      ) : null}
      {failureLog.map((failure) =>
        (<div style={{ color: "red" }}>[Error] {`${failure}`}</div>)
      )}
      <DialogFooter>
        <PrimaryButton onClick={() => handleGithubExport()} text="Export" />
        <DefaultButton onClick={() => onClose()} text="Cancel" />
      </DialogFooter>
    </Dialog>
  )
}

export default GithubExportForm;