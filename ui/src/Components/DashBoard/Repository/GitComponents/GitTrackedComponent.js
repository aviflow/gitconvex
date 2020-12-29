import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  GIT_ACTION_TRACKED_FILES,
  GIT_ACTION_UNTRACKED_FILES,
  GIT_TRACKED_FILES,
} from "../../../../actionStore";
import { ContextProvider } from "../../../../context";
import { globalAPIEndpoint } from "../../../../util/env_config";
import "../../../styles/GitTrackedComponent.css";
import GitDiffViewComponent from "./GitDiffViewComponent";
import GitOperationComponent from "./GitOperation/GitOperationComponent";

export default function GitTrackedComponent(props) {
  library.add(fab);
  const [gitDiffFilesState, setGitDiffFilesState] = useState([]);
  const [gitUntrackedFilesState, setGitUntrackedFilesState] = useState([]);
  const [topMenuItemState, setTopMenuItemState] = useState("File View");
  const topMenuItems = ["File View", "Git Difference", "Git Operations"];
  const [noChangeMarker, setNoChangeMarker] = useState(false);
  const [requestStateChange, setRequestChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useContext(ContextProvider);

  const operationStateChangeHandler = () => {
    setRequestChange(true);
  };

  const memoizedGitDiffView = useMemo(() => {
    return <GitDiffViewComponent repoId={props.repoId}></GitDiffViewComponent>;
  }, [props.repoId]);

  const memoizedGitOperationView = useMemo(() => {
    return (
      <GitOperationComponent
        repoId={props.repoId}
        stateChange={operationStateChangeHandler}
      ></GitOperationComponent>
    );
  }, [props.repoId]);

  useEffect(() => {
    let apiEndPoint = globalAPIEndpoint;
    setRequestChange(false);
    setIsLoading(true);
    setNoChangeMarker(false);

    axios({
      url: apiEndPoint,
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      data: {
        query: `
            query {
                gitChanges(repoId: "${props.repoId}"){
                  gitUntrackedFiles
                  gitChangedFiles
                  gitStagedFiles
                }
            }
        `,
      },
    })
      .then((res) => {
        if (res) {
          var apiData = res.data.data.gitChanges;
          const {
            gitChangedFiles,
            gitUntrackedFiles,
            gitStagedFiles,
          } = apiData;

          if (
            (gitChangedFiles || gitUntrackedFiles) &&
            (gitChangedFiles.length > 0 || gitUntrackedFiles.length > 0)
          ) {
            setGitDiffFilesState([...gitChangedFiles]);
            setGitUntrackedFilesState([...gitUntrackedFiles]);
            setNoChangeMarker(false);
            setIsLoading(false);

            dispatch({
              type: GIT_TRACKED_FILES,
              payload: gitChangedFiles,
            });

            dispatch({
              type: GIT_ACTION_TRACKED_FILES,
              payload: [...gitChangedFiles],
            });

            dispatch({
              type: GIT_ACTION_UNTRACKED_FILES,
              payload: [...gitUntrackedFiles],
            });
          } else {
            if (gitStagedFiles.length === 0) {
              setNoChangeMarker(true);
              setIsLoading(false);
            }

            if (gitStagedFiles.length > 0) {
              setIsLoading(false);
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setNoChangeMarker(true);
      });
  }, [props.repoId, dispatch, topMenuItemState, requestStateChange]);

  function diffPane() {
    var deletedArtifacts = [];
    var modifiedArtifacts = [];

    if (gitDiffFilesState && gitDiffFilesState.length > 0) {
      gitDiffFilesState.forEach((diffFile, index) => {
        var splitFile = diffFile.split(",");
        var flag = splitFile[0];
        var name = splitFile[1];
        var styleSelector = "p-1 ";
        switch (flag) {
          case "M":
            styleSelector += "text-yellow-900 bg-yellow-100";
            modifiedArtifacts.push(
              <div
                className="git-tracked--changes items-center border-b border-white border-dotted"
                key={name}
              >
                <div
                  className={`git-changed-item ${styleSelector} w-11/12 p-3 overflow-x-auto`}
                  title={name}
                >
                  {name}
                </div>
                <div className="p-2 text-yellow-600 border-2 border-yellow-200 font-sans font-semibold bg-yellow-50 w-1/6 text-center">
                  MODIFIED
                </div>
              </div>
            );
            break;
          case "D":
            styleSelector += "text-red-900 bg-red-200";
            deletedArtifacts.push(
              <div
                className="git-tracked--changes items-center border-b border-white border-dotted"
                key={name}
              >
                <div
                  className={`git-changed-item ${styleSelector} w-11/12 overflow-x-auto p-3`}
                  title={name}
                >
                  {name}
                </div>
                <div className="p-2 text-red-600 border-2 border-red-200 font-sans font-semibold bg-red-50 w-1/6 text-center">
                  DELETED
                </div>
              </div>
            );
            break;
          default:
            styleSelector += "text-indigo-900 bg-indigo-200";
            break;
        }
      });

      return (
        <>
          {modifiedArtifacts} {deletedArtifacts}
        </>
      );
    } else {
      return (
        <div className="mx-auto w-3/4 my-4 p-2 border-b-4 border-dashed border-pink-300 rounded-md text-center font-sans font-semibold text-xl">
          {isLoading ? (
            <span className="text-gray-400">
              Fetching results from the server...
            </span>
          ) : (
            <span>No changes in the repo!</span>
          )}
        </div>
      );
    }
  }

  function untrackedPane() {
    let untrackedFiles = [];

    untrackedFiles = gitUntrackedFilesState
      .map((entry) => entry)
      .filter((item) => {
        if (item) {
          return true;
        }
        return false;
      });

    return untrackedFiles.map((entry, index) => {
      return (
        <div
          className="flex git-tracked--untracked items-center border-b border-white border-dotted"
          key={`${entry}-${index}`}
        >
          <div
            className="git-changed-item p-3 text-indigo-900 bg-indigo-100 w-11/12 overflow-x-auto"
            title={entry}
          >
            {entry}
          </div>
          <div className="p-2 text-indigo-600 border-2 border-indigo-200 font-sans font-semibold bg-indigo-50 w-1/6 text-center">
            UNTRACKED
          </div>
        </div>
      );
    });
  }

  function menuComponent() {
    const FILE_VIEW = "File View";
    const GIT_DIFFERENCE = "Git Difference";
    const GIT_OPERATIONS = "Git Operations";

    switch (topMenuItemState) {
      case FILE_VIEW:
        if (!noChangeMarker) {
          return (
            <div className="git-tracked--diff">
              {gitDiffFilesState && !isLoading ? (
                diffPane()
              ) : (
                <div className="rounded-lg shadow-md text-center text-indigo-700 text-2xl border-b-4 border-dashed border-indigo-300 p-4 font-sans">
                  Getting file based status...
                </div>
              )}
              {gitUntrackedFilesState && !isLoading ? untrackedPane() : null}
            </div>
          );
        } else {
          return (
            <div className="rounded-lg shadow-md text-center text-red-700 text-2xl border-b-4 border-dashed border-red-300 p-4 font-sans">
              No changes available in the repo
            </div>
          );
        }
      case GIT_DIFFERENCE:
        if (!noChangeMarker) {
          return memoizedGitDiffView;
        }
        break;
      case GIT_OPERATIONS:
        return memoizedGitOperationView;
      default:
        return (
          <div className="text-xl text-center"> Invalid Menu Selector! </div>
        );
    }
  }

  function presentChangeComponent() {
    return (
      <>
        <div className="git-tracked--topmenu">
          {topMenuItems.map((item) => {
            let styleSelector = "git-tracked--menu-default ";
            if (item === topMenuItemState) {
              styleSelector +=
                "bg-blue-100 text-blue-700 border-b border-blue-600";
            } else {
              styleSelector += "bg-blue-500 text-white";
            }
            return (
              <div
                className={`git-tracked--menu-default ${styleSelector}`}
                key={item}
                onClick={() => {
                  setTopMenuItemState(item);
                  // Resetting branch error in top bar component to prevent the error banner from getting displayed after \
                  // switching the menu
                  props.resetBranchError();
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <style jsx>
        {`
          .git-changed-item::-webkit-scrollbar {
            background: rgba(0, 0, 0, 0);
            width: 10px;
            height: 1px;
            border: solid 1px rgba(0, 0, 0, 0);
          }

          .git-changed-item::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0);
          }
        `}
      </style>
      {noChangeMarker ? (
        <>
          <div className="git-tracked--wrapper">{memoizedGitOperationView}</div>
          <div className="git-tracked--nochange">
            No changes found in the selected git repo
          </div>
          <div className="git-tracked--alert">
            <div>
              <FontAwesomeIcon
                icon={["fab", "creative-commons-zero"]}
                className="git-tracked--alert--icon"
              ></FontAwesomeIcon>
            </div>
            <div className="git-tracked--alert--msg">"0" changes in repo</div>
          </div>
        </>
      ) : (
        <>
          {presentChangeComponent()}
          <div className="git-tracked--wrapper"> {menuComponent()} </div>
        </>
      )}
    </>
  );
}