// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type AddRepoParams struct {
	RepoID  string `json:"repoId"`
	Status  string `json:"status"`
	Message string `json:"message"`
}

type BranchDeleteStatus struct {
	Status string `json:"status"`
}

type FetchRepoParams struct {
	RepoID    []*string `json:"repoId"`
	RepoName  []*string `json:"repoName"`
	RepoPath  []*string `json:"repoPath"`
	TimeStamp []*string `json:"timeStamp"`
}

type FetchResult struct {
	Status       string    `json:"status"`
	FetchedItems []*string `json:"fetchedItems"`
}

type GitFolderContentResults struct {
	TrackedFiles     []*string `json:"trackedFiles"`
	FileBasedCommits []*string `json:"fileBasedCommits"`
}

type GitRepoStatusResults struct {
	GitRemoteData        *string   `json:"gitRemoteData"`
	GitRepoName          *string   `json:"gitRepoName"`
	GitBranchList        []*string `json:"gitBranchList"`
	GitAllBranchList     []*string `json:"gitAllBranchList"`
	GitCurrentBranch     *string   `json:"gitCurrentBranch"`
	GitRemoteHost        *string   `json:"gitRemoteHost"`
	GitTotalCommits      *float64  `json:"gitTotalCommits"`
	GitLatestCommit      *string   `json:"gitLatestCommit"`
	GitTotalTrackedFiles *int      `json:"gitTotalTrackedFiles"`
}

type HealthCheckParams struct {
	Os  string `json:"os"`
	Git string `json:"git"`
}

type PullResult struct {
	Status      string    `json:"status"`
	PulledItems []*string `json:"pulledItems"`
}

type BranchCompareResults struct {
	Date    string        `json:"date"`
	Commits []*GitCommits `json:"commits"`
}

type CodeFileType struct {
	FileData []*string `json:"fileData"`
}

type DeleteStatus struct {
	Status string `json:"status"`
	RepoID string `json:"repoId"`
}

type FileLineChangeResult struct {
	DiffStat string    `json:"diffStat"`
	FileDiff []*string `json:"fileDiff"`
}

type GitChangeResults struct {
	GitUntrackedFiles []*string `json:"gitUntrackedFiles"`
	GitChangedFiles   []*string `json:"gitChangedFiles"`
	GitStagedFiles    []*string `json:"gitStagedFiles"`
}

type GitCommitFileResult struct {
	Type     string `json:"type"`
	FileName string `json:"fileName"`
}

type GitCommitLogResults struct {
	TotalCommits *float64      `json:"totalCommits"`
	Commits      []*GitCommits `json:"commits"`
}

type GitCommits struct {
	Hash             *string `json:"hash"`
	Author           *string `json:"author"`
	CommitTime       *string `json:"commitTime"`
	CommitMessage    *string `json:"commitMessage"`
	CommitFilesCount *int    `json:"commitFilesCount"`
}

type SettingsDataResults struct {
	SettingsDatabasePath string `json:"settingsDatabasePath"`
	SettingsPortDetails  string `json:"settingsPortDetails"`
}