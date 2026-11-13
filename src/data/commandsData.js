// Enterprise DevOps & Cloud Commands Database
// Categorized for Git, Jenkins CLI, Docker, Kubernetes (kubectl), and AWS CLI

export const DEVOPS_COMMANDS = [
  // ==========================================
  // GIT COMMANDS
  // ==========================================
  {
    id: 'git-config-identity',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Configuration & Setup',
    title: 'Configure Git Identity (Global)',
    command: 'git config --global user.name "Your Name"\ngit config --global user.email "name@example.com"',
    explanation: 'Configures the commit author name and email attached to all commits in your local environment.',
    flags: [
      { flag: '--global', desc: 'Applies to all repositories on the current machine (~/.gitconfig)' },
      { flag: '--local', desc: 'Applies only to the current repository (.git/config)' }
    ],
    example: 'git config --global user.name "John Doe"\ngit config --global user.email "john@company.com"',
    bestPractice: 'Always use your corporate email address for enterprise repos and personal email for open source.'
  },
  {
    id: 'git-init-clone',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Repository Setup',
    title: 'Initialize or Clone Repository',
    command: 'git init\n# OR clone existing:\ngit clone <url>',
    explanation: 'Initializes a new empty Git repository or clones an existing remote repository onto your machine.',
    flags: [
      { flag: 'git init', desc: 'Creates the .git directory structure in the current working folder' },
      { flag: '--depth 1', desc: 'Shallow clone with only the latest commit to speed up CI/CD pipelines' },
      { flag: '-b <branch>', desc: 'Clone a specific branch directly' }
    ],
    example: 'git clone --depth 1 -b main https://github.com/org/microservice.git',
    bestPractice: 'Use shallow clones (--depth 1) in automated build systems like Jenkins to save disk space and network bandwidth.'
  },
  {
    id: 'git-status-diff',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Inspection & Diffing',
    title: 'Inspect Working Tree & View Diffs',
    command: 'git status\ngit diff\ngit diff --staged',
    explanation: 'Checks the state of your working directory and staging index. "git diff" displays unstaged modifications; "git diff --staged" displays changes staged for the next commit.',
    flags: [
      { flag: '-s, --short', desc: 'Shows compact two-character status indicators' },
      { flag: '--staged / --cached', desc: 'Compares staged changes against the latest commit (HEAD)' }
    ],
    example: 'git status -s\ngit diff --stat',
    bestPractice: 'Always run "git diff --staged" right before running "git commit" to avoid committing debug logs, passwords, or temporary files.'
  },
  {
    id: 'git-add-commit',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Staging & Commits',
    title: 'Stage Changes & Create Commits',
    command: 'git add <file>       # Stage specific file\ngit add -A            # Stage all changes\ngit commit -m "feat: descriptive commit message"\ngit commit --amend    # Edit/update previous commit',
    explanation: 'Stages modified files into the index and creates a permanent commit object. "--amend" updates the most recent commit with new staged changes.',
    flags: [
      { flag: '-A, --all', desc: 'Stages modified, newly created, and deleted files' },
      { flag: '-p, --patch', desc: 'Interactively review and stage individual code hunks' },
      { flag: '--amend', desc: 'Combines staged changes into the latest commit without creating a new commit' }
    ],
    example: 'git add -A\ngit commit -m "fix(auth): handle JWT expiry gracefully"',
    bestPractice: 'Never amend commits that have already been pushed to a shared public branch like main or develop.'
  },
  {
    id: 'git-log-graph',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'History & Inspection',
    title: 'View Commit History Graph & Inspect Details',
    command: 'git log --oneline --graph --all\ngit show <sha>\ngit blame <file>',
    explanation: 'Visualizes the commit history graph across all branches. "git show" displays the exact patch of a specific commit SHA. "git blame" reveals who last modified each line of a file.',
    flags: [
      { flag: '--oneline', desc: 'Condenses each commit into a single line with abbreviated SHA' },
      { flag: '--graph', desc: 'Draws an ASCII branch topology graph' },
      { flag: '--all', desc: 'Includes commits from all local and remote tracking branches' }
    ],
    example: 'git log --oneline -n 10\ngit show 7a8b9c0\ngit blame server.js -L 10,25',
    bestPractice: 'Use "git blame -w" to ignore whitespace-only changes when tracking down who introduced a bug.'
  },
  {
    id: 'git-branch-switch',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Branch Management',
    title: 'Branch Management (Create, Switch, Delete)',
    command: 'git branch               # List local branches\ngit switch <name>         # Switch to branch\ngit switch -c <name>      # Create and switch\ngit branch -d <name>      # Safe delete (merged)\ngit branch -D <name>      # Force delete',
    explanation: 'Manages lightweight branch pointers. "git switch -c" creates and checks out a new branch in a single command. Safe deletion (-d) warns if the branch has unmerged work.',
    flags: [
      { flag: '-c', desc: 'Create and switch to new branch' },
      { flag: '-d', desc: 'Delete merged branch' },
      { flag: '-D', desc: 'Force delete unmerged branch' }
    ],
    example: 'git switch -c feature/payment-gateway\ngit branch -d feature/payment-gateway',
    bestPractice: 'Prefer modern "git switch" and "git restore" over legacy "git checkout" to avoid confusing branch switching with file restoration.'
  },
  {
    id: 'git-merge-rebase',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Integration & History Cleanup',
    title: 'Merge, Rebase & Interactive Squashing',
    command: 'git merge <branch>\ngit rebase <branch>\ngit rebase -i HEAD~3     # Interactive squash/reorder last 3\ngit cherry-pick <sha>',
    explanation: 'Integrates changes from another branch. Merge creates a 3-way merge commit; Rebase replays your commits linearly onto the tip of the target branch. Cherry-pick applies an individual commit.',
    flags: [
      { flag: '--no-ff', desc: 'Forces a dedicated merge commit even if fast-forward is possible' },
      { flag: '-i', desc: 'Interactive mode for squashing, rewording, or dropping commits' },
      { flag: 'cherry-pick', desc: 'Applies the patch from a single commit onto current branch' }
    ],
    example: 'git rebase origin/main\ngit cherry-pick -x 4f2c1a8',
    bestPractice: 'Use rebase locally on private feature branches for a clean linear history; never rebase shared team branches.'
  },
  {
    id: 'git-remotes-sync',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Remote Operations',
    title: 'Remote Repositories & Safe Pushing',
    command: 'git remote -v\ngit remote add origin <url>\ngit fetch\ngit pull\ngit push -u origin <branch>\ngit push --force-with-lease',
    explanation: 'Connects to remote repositories. "git fetch" retrieves remote objects without altering your files; "git pull" fetches and integrates. "--force-with-lease" force pushes safely only if remote has not changed.',
    flags: [
      { flag: '-u, --set-upstream', desc: 'Sets upstream tracking reference for future parameterless git push/pull' },
      { flag: '--force-with-lease', desc: 'Refuses to overwrite remote if another developer pushed commits in the meantime' }
    ],
    example: 'git push -u origin feature/login\ngit push --force-with-lease origin feature/login',
    bestPractice: 'Never use plain "git push -f"; always use "git push --force-with-lease" to avoid clobbering a teammate\'s commits.'
  },
  {
    id: 'git-restore-reset',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Undoing Changes',
    title: 'Restore, Soft/Hard Reset & Revert',
    command: 'git restore <file>              # Discard unstaged changes\ngit restore --staged <file>     # Unstage file\ngit reset --soft HEAD~1         # Undo commit, keep changes staged\ngit reset --hard HEAD~1         # Undo commit and wipe changes\ngit revert <sha>                # Safe undo by creating inverse commit',
    explanation: 'Safely or destructively rolls back work. "git restore" recovers files from index/commit. "git reset --soft" preserves your work in the staging area. "git revert" is safe for shared branches.',
    flags: [
      { flag: '--soft', desc: 'Resets commit pointer; keeps all code changes staged in index' },
      { flag: '--hard', desc: 'Resets commit pointer, index, AND working tree (destructive)' },
      { flag: 'revert', desc: 'Creates an inverse commit that undoes changes without rewriting history' }
    ],
    example: 'git restore src/App.jsx\ngit revert 9b8a7c6',
    bestPractice: 'Use "git revert" for public branches (main) and "git reset" only for local, unpushed branches.'
  },
  {
    id: 'git-reflog-stash-clean',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Disaster Recovery & Workspace Hygiene',
    title: 'Reflog Recovery, Stashing & Untracked Cleanup',
    command: 'git reflog\ngit stash\ngit stash list\ngit stash pop\ngit clean -fd                  # Remove untracked files and directories\ngit tag -a v1.0 -m "release" && git push --tags',
    explanation: 'Emergency recovery and workspace cleanup. "git reflog" records every movement of HEAD, allowing recovery of deleted commits. "git clean -fd" removes untracked build artifacts.',
    flags: [
      { flag: 'reflog', desc: 'Shows history of all HEAD positions (even after hard resets or branch deletion)' },
      { flag: '-f, --force', desc: 'Force deletion of untracked files' },
      { flag: '-d', desc: 'Remove untracked directories alongside files' }
    ],
    example: 'git reset --hard HEAD@{3}\ngit clean -fd',
    bestPractice: 'Run "git clean -nd" (dry run) before "git clean -fd" to preview which files will be deleted.'
  },
  // ==========================================
  // ATLASSIAN GIT CHEAT SHEET EXPANSION SUITE
  // ==========================================
  {
    id: 'git-config-cheat-suite',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Configuration (Cheat Sheet)',
    title: 'Git Config: Aliases, System Editor & Global Edit',
    command: 'git config --global user.name <name>\ngit config --global user.email <email>\ngit config --global alias.<alias-name> <git-command>\ngit config --system core.editor <editor>\ngit config --global --edit\ngit config --global --list',
    explanation: 'Configures identity, command shortcuts (aliases), system text editors, and directly edits the global configuration file (~/.gitconfig).',
    flags: [
      { flag: 'alias.<alias-name>', desc: 'Creates a custom command shortcut (e.g. alias.glog "log --graph --oneline")' },
      { flag: '--system core.editor', desc: 'Sets default editor for all system users (e.g. vi, nano, code --wait)' },
      { flag: '--global --edit', desc: 'Opens global configuration file in text editor for manual editing' },
      { flag: '--global --list', desc: 'Displays all active global Git configurations' }
    ],
    example: 'git config --global alias.glog "log --graph --oneline"\ngit config --global core.editor nano',
    bestPractice: 'Create standard aliases for frequent team workflows to avoid typing lengthy flag sequences repeatedly.'
  },
  {
    id: 'git-unstaging-cached',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Undoing Changes (Cheat Sheet)',
    title: 'Safe File Unstaging (git rm --cached vs git reset)',
    command: 'git rm --cached <file>       # Unstages file, leaves file on disk\ngit reset <file>               # Equivalent way to unstage back to working dir\ngit clean -n                   # Preview untracked files to be removed (dry run)\ngit clean -f                   # Force execute removal of untracked files',
    explanation: 'Moves accidentally staged files back to the untracked/modified state in your Working Directory without deleting the file from disk. "git clean -n" shows which files will be removed before running -f.',
    flags: [
      { flag: '--cached', desc: 'Removes file from staging area index while preserving local disk copy completely intact' },
      { flag: 'clean -n', desc: 'Dry-run preview: shows which untracked files would be removed without deleting' },
      { flag: 'clean -f', desc: 'Force deletes untracked files from working directory' }
    ],
    example: 'git rm --cached .env.local\ngit clean -n',
    bestPractice: 'CRITICAL: Never use plain "git rm <file>" without "--cached" when trying to unstage, as plain "git rm" destroys the file on disk.'
  },
  {
    id: 'git-diff-advanced-cheat',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Diffing & Inspection (Cheat Sheet)',
    title: 'Git Diff: Working Tree vs Staged vs HEAD',
    command: 'git diff                     # Unstaged changes between index and working tree\ngit diff HEAD                  # Differences between working directory and last commit\ngit diff --cached              # Differences between staged changes (index) and last commit',
    explanation: 'Inspects changes at each stage of the three-section lifecycle. "git diff HEAD" compares your disk against the last snapshot; "--cached" inspects what is queued for the next commit.',
    flags: [
      { flag: 'HEAD', desc: 'Compares working directory to the tip commit of current branch' },
      { flag: '--cached / --staged', desc: 'Compares index (staged files) against the latest commit snapshot' },
      { flag: '--stat', desc: 'Generates summary diff showing modified lines per file' }
    ],
    example: 'git diff HEAD\ngit diff --cached --stat',
    bestPractice: 'Always run "git diff --cached" right before running "git commit" to verify exactly what will be recorded in the snapshot.'
  },
  {
    id: 'git-log-advanced-cheat',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Commit History (Cheat Sheet)',
    title: 'Advanced Git Log Filtering & Visualization',
    command: 'git log -<limit>               # Limit number of commits (e.g. git log -5)\ngit log --oneline              # Condense each commit to a single line\ngit log -p                     # Display full line-by-line patch diff per commit\ngit log --stat                 # Show altered files and count of added/deleted lines\ngit log --author="<pattern>"   # Search commits by author name/email\ngit log --grep="<pattern>"     # Search commits with commit message matching pattern\ngit log <since>..<until>       # Commits between two revisions (e.g. main..feature)\ngit log -- <file>              # Only display commits that modified specified file\ngit log --graph --decorate    # Draws text-based ASCII graph with branch/tag names',
    explanation: 'Comprehensive commit history inspection and filtering options from the Atlassian cheat sheet.',
    flags: [
      { flag: '-<limit>', desc: 'Limits commit history output to specified number of commits' },
      { flag: '--stat', desc: 'Includes altered files and relative added/deleted line statistics' },
      { flag: '--author', desc: 'Filters commits authored by specific engineer' },
      { flag: '--grep', desc: 'Searches commit messages for issue ticket numbers or keywords' },
      { flag: '--graph --decorate', desc: 'Draws ASCII branch graph on left and labels branches and tags' }
    ],
    example: 'git log --graph --decorate --oneline -10\ngit log --grep="CVE-2024" --stat',
    bestPractice: 'Use "git log --oneline --graph" during code reviews to understand how branches merged into main.'
  },
  {
    id: 'git-reset-cheat-matrix',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Undoing & Reset (Cheat Sheet)',
    title: 'Git Reset Matrix: Soft, Hard, Commit Pointers',
    command: 'git reset                     # Reset staging area to match latest commit (leaves disk files alone)\ngit reset --hard              # Reset staging area AND working directory (overwrites all changes)\ngit reset <commit>            # Move branch tip backward to <commit>, reset staging, keep disk edits\ngit reset --hard <commit>     # Resets staging & working dir to <commit>; deletes subsequent commits',
    explanation: 'Four distinct reset modes from the cheat sheet. Soft/mixed resets preserve your work; "--hard" destroys uncommitted disk edits.',
    flags: [
      { flag: 'git reset', desc: 'Unstages all files back to working directory without touching file contents' },
      { flag: '--hard', desc: 'Resets commit pointer, staging index, and working tree (destructive)' },
      { flag: '<commit>', desc: 'Rolls branch tip back to specified SHA without deleting work from disk' },
      { flag: '--hard <commit>', desc: 'Rolls back branch tip and wipes all changes made after <commit>' }
    ],
    example: 'git reset HEAD~1\ngit reset --hard 4a9bc12',
    bestPractice: 'Never use "git reset --hard" without checking "git status" or "git stash" first, as uncommitted work cannot be recovered by git reflog.'
  },
  {
    id: 'git-rebase-interactive-cheat',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'History Rewriting (Cheat Sheet)',
    title: 'Interactive Rebasing & History Cleanup',
    command: 'git rebase <base>             # Rebase current branch onto <base> (commit, branch, or tag)\ngit rebase -i <base>          # Interactively rebase: squash, reword, edit, or drop commits',
    explanation: 'Interactively rewrites local commit history before opening Pull Requests, allowing you to combine fixup commits and write clean messages.',
    flags: [
      { flag: '-i, --interactive', desc: 'Launches interactive text editor to specify action (pick, squash, reword, drop) per commit' },
      { flag: '--continue', desc: 'Continues rebase process after resolving merge conflicts' },
      { flag: '--abort', desc: 'Aborts rebase operation and returns repository to its initial pre-rebase state' }
    ],
    example: 'git rebase -i HEAD~4\ngit rebase --continue',
    bestPractice: 'The Golden Rule of Rebasing: Never rebase a public shared branch that other team members have already cloned.'
  },
  {
    id: 'git-remotes-cheat-suite',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Remote Operations (Cheat Sheet)',
    title: 'Remote Repositories: Rebase Pull & Advanced Push',
    command: 'git remote add <name> <url>   # Create new shortcut connection to remote repo\ngit fetch <remote> <branch>   # Fetches specific branch refs without merging into local files\ngit pull <remote>             # Fetch remote copy and immediately merge into local\ngit pull --rebase <remote>    # Fetch remote copy and rebase local commits on top (linear log)\ngit push <remote> <branch>    # Push branch commits and objects to remote\ngit push <remote> --force     # Force push (non-fast-forward merge)\ngit push <remote> --all       # Push all local branches to specified remote\ngit push <remote> --tags      # Send all local tags to remote repository',
    explanation: 'Complete remote repository management from the cheat sheet. Includes "git pull --rebase" for linear history and pushing all branches/tags.',
    flags: [
      { flag: 'pull --rebase', desc: 'Fetches remote branch and replays local commits on top, preventing unnecessary merge commits' },
      { flag: 'push --force', desc: 'Forces push even if non-fast-forward (use only on private branches)' },
      { flag: 'push --all', desc: 'Pushes all local branches to the remote repository in one command' },
      { flag: 'push --tags', desc: 'Sends all local tags to remote repo (tags are not sent by default push)' }
    ],
    example: 'git pull --rebase origin main\ngit push origin --tags',
    bestPractice: 'Remember that tags are never pushed by default "git push"; always run "git push <remote> --tags" for releases.'
  },
  {
    id: 'git-bisect',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Debugging & Diagnostics (Advanced)',
    title: 'Binary Search for Regressions (Git Bisect)',
    command: 'git bisect start\ngit bisect bad                 # Current commit is broken\ngit bisect good v1.0.0         # Known good release tag\n# Git checks out midpoint commits; test and mark:\ngit bisect good  (or git bisect bad)\ngit bisect reset               # End bisect session',
    explanation: 'Performs an automated binary search through commit history to identify the exact commit that introduced a bug or regression.',
    flags: [
      { flag: 'start / reset', desc: 'Begins and ends the binary search debugging session' },
      { flag: 'run <script>', desc: 'Runs an automated test script (e.g. npm test) to bisect automatically' }
    ],
    example: 'git bisect run npm test',
    bestPractice: 'Use "git bisect run <test-script>" to find broken commits automatically in seconds across hundreds of commits.'
  },
  {
    id: 'git-cherry-pick-suite',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Surgical Release Engineering',
    title: 'Surgical Hotfix Backporting (git cherry-pick)',
    command: 'git cherry-pick <sha>               # Apply single commit to current branch\ngit cherry-pick -x <sha>            # Appends "(cherry picked from commit ...)"\ngit cherry-pick --continue          # Continue after resolving conflicts\ngit cherry-pick --abort             # Abort cherry-pick and restore branch',
    explanation: 'Surgically applies the diff of a specific commit SHA from an unmerged branch into a production release branch without pulling in unreviewed code.',
    flags: [
      { flag: '-x', desc: 'Appends source commit hash to commit message for auditability and compliance' },
      { flag: '-n, --no-commit', desc: 'Applies changes directly into the working tree and staging index without committing' },
      { flag: '--continue', desc: 'Concludes cherry-pick after conflict markers have been manually resolved' }
    ],
    example: 'git cherry-pick -x 4f2c1a8\ngit cherry-pick --continue',
    bestPractice: 'Always use "-x" in enterprise teams to maintain provenance so security and release auditors can track where the patch originated.'
  },
  {
    id: 'git-filter-repo-purge',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Security Incident Response & DAG Purging',
    title: 'Purge Leaked Secrets & Large Files (git-filter-repo)',
    command: '# Purge a sensitive file from every commit in repository history:\ngit filter-repo --invert-paths --path <file-path>\n\n# Purge all instances of an API key or password:\ngit filter-repo --replace-text expressions.txt\n\n# Expire reflog and prune packfiles:\ngit reflog expire --expire=now --all && git gc --prune=now --aggressive\ngit push origin --force --all && git push origin --force --tags',
    explanation: 'The official Git core team tool for permanently eradicating leaked credentials or massive files from the entire commit DAG across all branches and tags.',
    flags: [
      { flag: '--invert-paths --path <p>', desc: 'Removes the specified file path from every historical tree snapshot' },
      { flag: '--replace-text <f>', desc: 'Finds and replaces secret strings with sanitized text across all commits' },
      { flag: '--force', desc: 'Bypasses safety checks on non-fresh clones' }
    ],
    example: 'git filter-repo --invert-paths --path server/config/secrets.json',
    bestPractice: 'Always clone a fresh mirror repo before running git-filter-repo, and revoke the leaked credentials immediately in the cloud provider.'
  },
  {
    id: 'git-worktree',
    category: 'git',
    categoryLabel: 'Git & GitHub',
    subcategory: 'Multi-Tasking & Parallel Development',
    title: 'Manage Multiple Branches Simultaneously (Git Worktree)',
    command: 'git worktree add ../hotfix-dir hotfix/p1-bug\ncd ../hotfix-dir\n# Fix bug, commit, and push\ncd -\ngit worktree remove ../hotfix-dir',
    explanation: 'Allows checking out multiple branches simultaneously into separate directories without stashing or cloning a second copy of the repo.',
    flags: [
      { flag: 'add <path> <branch>', desc: 'Checks out a branch into a new physical directory' },
      { flag: 'remove <path>', desc: 'Cleans up the linked worktree directory' }
    ],
    example: 'git worktree list',
    bestPractice: 'Use git worktree when you are halfway through a large feature and need to immediately fix an urgent production hotfix without stashing.'
  },

  // ==========================================
  // DOCKER COMMANDS
  // ==========================================
  {
    id: 'docker-build-run-basic',
    category: 'docker',
    categoryLabel: 'Docker Containers',
    subcategory: 'Container Lifecycle',
    title: 'Build & Run Containers (Detached & Interactive)',
    command: 'docker build -t app:1.0 .\ndocker run -d -p 8080:80 --name web app:1.0\ndocker run -it --rm -v $(pwd):/app -e KEY=val node:20 bash',
    explanation: 'Builds an image from a Dockerfile and runs a container. "-d" runs detached; "-p" publishes host:container ports; "-v" mounts a host volume; "--rm" cleans up container on exit.',
    flags: [
      { flag: '-d', desc: 'Run container in background (detached)' },
      { flag: '-p <host:cont>', desc: 'Map host port to container port' },
      { flag: '-v <host:cont>', desc: 'Bind mount directory from host into container' },
      { flag: '--rm', desc: 'Automatically remove the container when it exits' }
    ],
    example: 'docker run -d -p 3000:3000 --name api-service app:1.0',
    bestPractice: 'Always use "--rm" when running disposable debugging containers to prevent stopped container clutter.'
  },
  {
    id: 'docker-ps-manage',
    category: 'docker',
    categoryLabel: 'Docker Containers',
    subcategory: 'Process & Container Management',
    title: 'List, Start, Stop & Remove Containers/Images',
    command: 'docker ps\ndocker ps -a\ndocker stop <c> / docker start <c> / docker restart <c>\ndocker rm <c> / docker rmi <image>\ndocker images',
    explanation: 'Lists running containers ("ps") or all containers including stopped ones ("ps -a"). Stops, starts, restarts, and deletes containers and images.',
    flags: [
      { flag: '-a, --all', desc: 'Show all containers (default shows just running)' },
      { flag: '-q, --quiet', desc: 'Only display numeric container/image IDs' },
      { flag: '-f, --force', desc: 'Force removal of running container or tagged image' }
    ],
    example: 'docker stop web && docker rm web\ndocker rmi app:1.0',
    bestPractice: 'Use "docker stop" (which sends SIGTERM then SIGKILL after 10s) rather than "docker kill" to give applications time to drain connections.'
  },
  {
    id: 'docker-logs-exec-inspect',
    category: 'docker',
    categoryLabel: 'Docker Containers',
    subcategory: 'Debugging & Observability',
    title: 'Logs, Shell Execution, Inspect & File Copy',
    command: 'docker logs -f <c>\ndocker exec -it <c> sh\ndocker inspect <c>\ndocker cp <c>:/path ./local\ndocker stats / docker top <c>',
    explanation: 'Streams container standard output ("logs -f"), opens an interactive shell inside a running container ("exec -it"), inspects detailed JSON metadata, copies files between host and container, and monitors live CPU/memory metrics.',
    flags: [
      { flag: '-f, --follow', desc: 'Follow log output in real-time' },
      { flag: '--tail=<n>', desc: 'Number of lines to show from end of logs' },
      { flag: 'stats', desc: 'Live stream of container resource usage statistics' }
    ],
    example: 'docker logs -f --tail=50 web\ndocker exec -it web sh\ndocker cp web:/etc/nginx/nginx.conf ./backup.conf',
    bestPractice: 'Use "docker stats" during performance testing to identify container memory leaks or CPU throttling in real time.'
  },
  {
    id: 'docker-registry-ops',
    category: 'docker',
    categoryLabel: 'Docker Containers',
    subcategory: 'Registry & Network/Volume Operations',
    title: 'Registry Authentication, Networks & Volumes',
    command: 'docker pull <img> / docker push <img>\ndocker tag <img> <repo>/<img>:<tag>\ndocker login\ndocker network ls / docker network create <net>\ndocker volume ls / docker volume create <vol>\ndocker system prune -a',
    explanation: 'Authenticates with container registries (Docker Hub, AWS ECR), tags images for remote pushing, creates isolated user-defined bridge networks, manages persistent volumes, and cleans up unused disk cache.',
    flags: [
      { flag: 'system prune -a', desc: 'Removes all unused images, stopped containers, and build cache' },
      { flag: '--volumes', desc: 'Prunes all unused persistent volumes when passed to prune' }
    ],
    example: 'docker network create app-net\ndocker volume create db-data\ndocker system prune -a --volumes',
    bestPractice: 'Run "docker system prune -a" on automated Jenkins runner nodes regularly to prevent 100% full disk outages.'
  },
  {
    id: 'docker-compose-stack',
    category: 'docker',
    categoryLabel: 'Docker Containers',
    subcategory: 'Multi-Service Orchestration',
    title: 'Docker Compose Full Stack Management',
    command: 'docker compose up -d\ndocker compose down\ndocker compose ps\ndocker compose logs -f <service>\ndocker compose build\ndocker compose exec <service> sh',
    explanation: 'Manages multi-container application stacks defined in docker-compose.yml. Starts services in background, streams logs for specific microservices, rebuilds images, and tears down the entire stack.',
    flags: [
      { flag: 'up -d', desc: 'Starts containers in background detached mode' },
      { flag: 'down -v', desc: 'Tears down containers, networks, AND named volumes' },
      { flag: '--build', desc: 'Rebuilds container images before starting' }
    ],
    example: 'docker compose up -d --build\ndocker compose logs -f api db',
    bestPractice: 'Never store production database credentials directly in docker-compose.yml; reference an external, gitignored .env file.'
  },
  // Missing Docker Commands
  {
    id: 'docker-buildx-multiarch',
    category: 'docker',
    categoryLabel: 'Docker Containers',
    subcategory: 'BuildKit & Multi-Architecture',
    title: 'Multi-Architecture Image Builds (AMD64 & ARM64)',
    command: 'docker buildx create --name mybuilder --use\ndocker buildx build --platform linux/amd64,linux/arm64 -t <repo>/app:1.0 --push .',
    explanation: 'Builds and pushes multi-architecture images supporting both Intel/AMD x86_64 and ARM64 (Apple Silicon, AWS Graviton) in a single image manifest.',
    flags: [
      { flag: '--platform', desc: 'Target architectures to compile for (e.g. linux/amd64,linux/arm64)' },
      { flag: '--push', desc: 'Pushes the multi-arch manifest list directly to registry' }
    ],
    example: 'docker buildx build --platform linux/amd64,linux/arm64 -t org/api:v1.0 .',
    bestPractice: 'Always build multi-arch images if your organization deploys to AWS Graviton EC2 instances or EKS clusters to save 20% on compute costs.'
  },
  {
    id: 'docker-save-load',
    category: 'docker',
    categoryLabel: 'Docker Containers',
    subcategory: 'Offline Air-Gapped Migration',
    title: 'Save & Load Images as Tarballs (Air-Gapped)',
    command: 'docker save -o myapp.tar app:1.0\n# Transfer tarball to isolated environment, then:\ndocker load -i myapp.tar',
    explanation: 'Exports a container image and its layers to an uncompressed or gzipped tarball file, enabling image transfer to air-gapped or offline servers without an internet registry.',
    flags: [
      { flag: '-o, --output', desc: 'Write to a file instead of STDOUT' },
      { flag: '-i, --input', desc: 'Read from a tar archive file' }
    ],
    example: 'docker save app:1.0 | gzip > app.tar.gz\ngunzip -c app.tar.gz | docker load',
    bestPractice: 'Use docker save/load in secure government, healthcare, or air-gapped financial infrastructure where outbound internet access is strictly blocked.'
  },
  {
    id: 'docker-stats-top-inspect',
    category: 'docker',
    categoryLabel: 'Docker Containers',
    subcategory: 'Performance & Resource Monitoring',
    title: 'Container Process & Resource Inspection (Stats, Top, Inspect)',
    command: 'docker stats --no-stream\ndocker top <container>\ndocker inspect --format \'{{.State.Status}} (PID: {{.State.Pid}})\' <container>',
    explanation: 'Monitors real-time CPU %, memory consumption, block I/O, and discovers the host Linux PID and active processes running within the container namespace.',
    flags: [
      { flag: '--no-stream', desc: 'Pull a single snapshot of resource metrics instead of streaming continuously' },
      { flag: '--format', desc: 'Extract specific JSON attributes using Go template syntax' }
    ],
    example: 'docker stats --no-stream api-server\ndocker inspect -f \'{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}\' db',
    bestPractice: 'Always check container exit codes and OOMKilled status via docker inspect when troubleshooting exit code 137.'
  },
  {
    id: 'docker-system-df-prune',
    category: 'docker',
    categoryLabel: 'Docker Containers',
    subcategory: 'Disk Management & Safe Cleanup',
    title: 'Analyze Disk Usage & Safe Pruning (df & prune)',
    command: 'docker system df -v\ndocker container prune --filter "until=24h" -f\ndocker image prune -f\ndocker builder prune --filter "until=48h" -f',
    explanation: 'Analyzes physical disk consumption across images, containers, local volumes, and build cache. Safely removes dangling artifacts without wiping production base images.',
    flags: [
      { flag: '-v, --verbose', desc: 'Show detailed per-image and per-container disk consumption breakdown' },
      { flag: '--filter', desc: 'Apply time or label thresholds (e.g. until=24h) to avoid deleting active cache' }
    ],
    example: 'docker system df\ndocker image prune -a --filter "label!=keep=true" -f',
    bestPractice: 'Never run "docker system prune -a --volumes" on shared production hosts; it deletes all non-running base images and persistent database volumes.'
  },
  {
    id: 'docker-network-custom-bridge',
    category: 'docker',
    categoryLabel: 'Docker Containers',
    subcategory: 'Container Networking & DNS',
    title: 'User-Defined Bridge Network & Embedded DNS',
    command: 'docker network create --driver bridge app-net\ndocker run -d --name db --network app-net postgres:16-alpine\ndocker run -d --name api --network app-net -e DB_HOST=db my-api:1.0\ndocker network connect app-net <container>',
    explanation: 'Creates an isolated virtual bridge network where Docker\'s embedded DNS server (127.0.0.11) automatically resolves container names and service aliases.',
    flags: [
      { flag: '--driver', desc: 'Network driver (bridge, host, none, overlay)' },
      { flag: '--subnet', desc: 'Specify custom CIDR subnet (e.g. 172.28.0.0/16)' }
    ],
    example: 'docker network create --subnet 172.25.0.0/16 backend-network',
    bestPractice: 'Always create custom bridge networks for multi-container apps; the default bridge network does NOT support automatic container name DNS resolution.'
  },
  {
    id: 'docker-volume-named-storage',
    category: 'docker',
    categoryLabel: 'Docker Containers',
    subcategory: 'Persistent Storage Volumes',
    title: 'Named Volume Management & Data Persistence',
    command: 'docker volume create pg_data\ndocker run -d --name db -v pg_data:/var/lib/postgresql/data postgres:16-alpine\ndocker volume inspect pg_data\ndocker volume ls',
    explanation: 'Provisions persistent storage managed under /var/lib/docker/volumes/_data. Bypasses the Copy-on-Write OverlayFS driver for native disk I/O performance and survives container deletion.',
    flags: [
      { flag: '-v <volume>:<path>', desc: 'Mount named volume into container destination directory' },
      { flag: '-v <host_path>:<path>', desc: 'Bind mount host directory directly (ideal for local dev code)' }
    ],
    example: 'docker run -d -v db_backups:/backups -v $(pwd):/app node:20-alpine',
    bestPractice: 'Use named volumes for production stateful workloads (databases) and bind mounts only for developer source code hot-reloading.'
  },
  {
    id: 'docker-history-layers',
    category: 'docker',
    categoryLabel: 'Docker Containers',
    subcategory: 'Image Layer & Cache Auditing',
    title: 'Audit Image Layers, Sizes & Build Cache (history)',
    command: 'docker history --no-trunc <image-name>\ndocker image inspect --format \'{{json .RootFS.Layers}}\' <image-name>',
    explanation: 'Displays the cryptographic SHA256 layer stack, sizes, and corresponding Dockerfile instructions to identify layer bloat and optimize build cache invalidation.',
    flags: [
      { flag: '--no-trunc', desc: 'Display full instruction strings and layer IDs without truncating' },
      { flag: '--human=true', desc: 'Print sizes in human-readable format (MB/GB)' }
    ],
    example: 'docker history --no-trunc my-org/backend:latest',
    bestPractice: 'Audit image history before production release to ensure build tools, SSH keys, or .git directories were not inadvertently bundled into image layers.'
  },
  {
    id: 'docker-private-registry-ops',
    category: 'docker',
    categoryLabel: 'Docker Containers',
    subcategory: 'Private Registry Operations',
    title: 'Run In-Cluster Registry & Deduplicated Pushes',
    command: 'docker run -d -p 5000:5000 --name registry registry:2\ndocker tag my-app:1.0 localhost:5000/my-app:1.0\ndocker push localhost:5000/my-app:1.0\ncurl http://localhost:5000/v2/_catalog',
    explanation: 'Spins up an OCI-compliant local Docker registry container. Pushing updated images deduplicates unchanged layers with "Layer already exists" responses.',
    flags: [
      { flag: '-p 5000:5000', desc: 'Publish standard OCI registry HTTP port' },
      { flag: '-v /local/storage:/var/lib/registry', desc: 'Persist registry blobs on host disk' }
    ],
    example: 'docker tag api:2.1 localhost:5000/api:2.1 && docker push localhost:5000/api:2.1',
    bestPractice: 'In enterprise production, front private registries with Harbor or AWS ECR with IAM token authentication and vulnerability scanning.'
  },

  // ==========================================
  // KUBERNETES (KUBECTL) COMMANDS
  // ==========================================
  {
    id: 'k8s-get-resources',
    category: 'kubernetes',
    categoryLabel: 'Kubernetes (K8s)',
    subcategory: 'Cluster & Resource Discovery',
    title: 'List & Watch Resources Across Namespaces',
    command: 'kubectl get pods -A -o wide                    # All namespaces with node IPs\nkubectl get deploy,svc,ing -n <ns>             # Deployments, Services, Ingress\nkubectl get nodes\nkubectl get pods -w                            # Watch status changes in real-time',
    explanation: 'Queries the Kubernetes API server for core resources. "-A" queries all namespaces; "-o wide" outputs internal IP and assigned worker node; "-w" keeps terminal open streaming status updates.',
    flags: [
      { flag: '-A, --all-namespaces', desc: 'Query resources across all cluster namespaces' },
      { flag: '-o wide', desc: 'Output extra columns like Pod IP, Node assigned, and Nominated Node' },
      { flag: '-w, --watch', desc: 'Watch live status changes continuously' }
    ],
    example: 'kubectl get pods -n production -o wide\nkubectl get pods -l app=frontend -w',
    bestPractice: 'Use label selectors (e.g. -l app=payment) when getting pods to avoid scrolling through hundreds of unrelated microservices.'
  },
  {
    id: 'k8s-describe-logs-exec',
    category: 'kubernetes',
    categoryLabel: 'Kubernetes (K8s)',
    subcategory: 'Diagnosis & Deep Troubleshooting',
    title: 'Describe Events, Crash Logs & Remote Shell',
    command: 'kubectl describe pod <pod>                     # Events and reasons (CrashLoopBackOff)\nkubectl logs <pod> -f\nkubectl logs <pod> -c <container> --previous   # Crashed container logs\nkubectl exec -it <pod> -- sh',
    explanation: 'Primary troubleshooting toolkit. "describe" reveals scheduling decisions and OOM/health probe failures. "logs --previous" reads logs of a container instance right before it crashed. "exec" opens an interactive shell inside a pod.',
    flags: [
      { flag: '-f, --follow', desc: 'Stream live log output' },
      { flag: '-p, --previous', desc: 'Print logs for previous terminated instance of container' },
      { flag: '-c <container>', desc: 'Specify container name if pod has multiple containers' }
    ],
    example: 'kubectl describe pod order-service-6f8d-x9q -n prod\nkubectl logs order-service-6f8d-x9q -p',
    bestPractice: 'Whenever a pod enters CrashLoopBackOff or Error, run "kubectl logs <pod> -p" first to inspect the fatal exception that crashed the app.'
  },
  {
    id: 'k8s-apply-diff-delete',
    category: 'kubernetes',
    categoryLabel: 'Kubernetes (K8s)',
    subcategory: 'Declarative Manifest Management',
    title: 'Declarative Manifest Lifecycle (Diff, Apply, Delete)',
    command: 'kubectl diff -f file.yaml                      # Preview changes before applying\nkubectl apply -f file.yaml\nkubectl delete -f file.yaml\nkubectl delete pod <pod>                       # Controller automatically recreates it',
    explanation: 'Manages Kubernetes state declaratively using YAML manifests. "kubectl diff" calculates a visual colorized diff against live cluster state before applying changes.',
    flags: [
      { flag: 'diff', desc: 'Calculates server-side differences without modifying cluster' },
      { flag: '-f <path>', desc: 'Target YAML manifest file or directory' },
      { flag: '-R, --recursive', desc: 'Recursively process all YAML files in subdirectories' }
    ],
    example: 'kubectl diff -f ./k8s/deployment.yaml\nkubectl apply -f ./k8s/',
    bestPractice: 'Always run "kubectl diff -f" in production prior to "kubectl apply" to verify you aren\'t accidentally overriding replica counts or resource limits.'
  },
  {
    id: 'k8s-scale-rollout',
    category: 'kubernetes',
    categoryLabel: 'Kubernetes (K8s)',
    subcategory: 'Scaling & Rolling Updates',
    title: 'Scale Replicas & Manage Zero-Downtime Rollouts',
    command: 'kubectl scale deploy/<name> --replicas=3\nkubectl set image deploy/<name> <container>=<image>:<tag>\nkubectl rollout status deploy/<name>\nkubectl rollout history deploy/<name>\nkubectl rollout undo deploy/<name>',
    explanation: 'Scales pod replicas dynamically, updates deployment images, monitors rolling update progress, inspects historical revision logs, and triggers instant rollbacks on deployment failure.',
    flags: [
      { flag: 'rollout status', desc: 'Blocks until all pods in deployment pass readiness probes' },
      { flag: 'rollout undo', desc: 'Rolls back to the previous deployment revision' },
      { flag: '--to-revision=<n>', desc: 'Rolls back to a specific historical revision number' }
    ],
    example: 'kubectl set image deploy/api api=123.dkr.ecr...:v2.1.0\nkubectl rollout status deploy/api',
    bestPractice: 'Add "kubectl rollout status" in CI/CD pipelines right after setting images so automated builds fail if new pods fail health checks.'
  },
  {
    id: 'k8s-port-forward-debug',
    category: 'kubernetes',
    categoryLabel: 'Kubernetes (K8s)',
    subcategory: 'Networking & Administrative Access',
    title: 'Port-Forwarding, Live Editing & Resource Metrics',
    command: 'kubectl port-forward svc/<name> 8080:80\nkubectl edit deploy/<name>\nkubectl top pod / kubectl top node             # Requires metrics-server\nkubectl get events --sort-by=.lastTimestamp\nkubectl cp <pod>:/path ./local',
    explanation: 'Securely tunnels traffic to internal cluster services without public DNS, live-edits running resource manifests in vim/nano, inspects live CPU/memory metrics, views chronological cluster events, and transfers files.',
    flags: [
      { flag: 'port-forward', desc: 'Establishes local encrypted tunnel to private ClusterIP service or pod' },
      { flag: '--sort-by', desc: 'Sorts JSON output by specified field path' }
    ],
    example: 'kubectl port-forward svc/grafana 3000:80 -n monitoring\nkubectl top pods -n production',
    bestPractice: 'Avoid using "kubectl edit" in production environments because manual edits cause configuration drift from GitOps repositories.'
  },
  {
    id: 'k8s-troubleshoot-admin',
    category: 'kubernetes',
    categoryLabel: 'Kubernetes (K8s)',
    subcategory: 'Ephemeral Debugging & Cluster Administration',
    title: 'Ephemeral Pods, Labels, RBAC & Node Draining',
    command: 'kubectl run tmp --image=busybox -it --rm -- sh\nkubectl expose deploy/<name> --port=80\nkubectl label pod <pod> env=prod\nkubectl explain pod.spec.containers\nkubectl auth can-i create pods\nkubectl cordon <node> / kubectl uncordon <node>\nkubectl drain <node> --ignore-daemonsets',
    explanation: 'Spawns temporary troubleshooting pods to test internal DNS/connectivity, exposes deployments via ClusterIP, applies key-value labels, checks API schema specifications, verifies RBAC permissions, and cordons/drains nodes for safe maintenance.',
    flags: [
      { flag: 'cordon', desc: 'Marks worker node as unschedulable for any new pods' },
      { flag: 'drain', desc: 'Evicts all running workloads gracefully to other nodes' },
      { flag: '--ignore-daemonsets', desc: 'Allows node draining without attempting to evict DaemonSets (kube-proxy, etc.)' }
    ],
    example: 'kubectl run test-dns --image=busybox:1.28 -it --rm -- nslookup payment-service\nkubectl auth can-i delete pods --as system:serviceaccount:prod:ci-bot',
    bestPractice: 'Always cordon and drain worker nodes before upgrading Kubernetes versions or patching Linux AMI kernels in Amazon EKS.'
  },
  {
    id: 'k8s-config-contexts',
    category: 'kubernetes',
    categoryLabel: 'Kubernetes (K8s)',
    subcategory: 'Kubeconfig Contexts & Namespaces',
    title: 'Switch Clusters, Contexts & Default Namespaces',
    command: 'kubectl config get-contexts\nkubectl config use-context <ctx>\nkubectl config set-context --current --namespace=<ns>',
    explanation: 'Inspects and switches between multiple Kubernetes clusters (e.g. dev, staging, prod) stored in ~/.kube/config and changes your current default namespace to avoid typing "-n <ns>" on every command.',
    flags: [
      { flag: 'get-contexts', desc: 'Lists all available cluster contexts and identifies current active context (*)' },
      { flag: 'use-context', desc: 'Switches the active cluster and credentials' },
      { flag: '--current --namespace', desc: 'Sets default namespace for the active context' }
    ],
    example: 'kubectl config use-context arn:aws:eks:us-east-1:123456789012:cluster/prod-eks\nkubectl config set-context --current --namespace=production',
    bestPractice: 'Set your terminal prompt (using starship or kube-ps1) to display the current Kubernetes cluster and namespace to prevent executing commands in prod by mistake.'
  },
  // Missing Kubernetes Commands
  {
    id: 'k8s-rollout-restart',
    category: 'kubernetes',
    categoryLabel: 'Kubernetes (K8s)',
    subcategory: 'Workloads & Operations',
    title: 'Rolling Restart Workload (Refresh Pods & ConfigMaps)',
    command: 'kubectl rollout restart deployment/<name> -n <ns>\n# Also works for StatefulSet and DaemonSet:\nkubectl rollout restart statefulset/redis-cluster',
    explanation: 'Performs a graceful rolling restart of all pods in a deployment with zero downtime by updating the pod template annotation with a new timestamp. Crucial when ConfigMaps or Secrets change.',
    flags: [
      { flag: 'restart', desc: 'Triggers a rolling replacement of all replica pods without downtime' }
    ],
    example: 'kubectl rollout restart deployment/auth-service -n production',
    bestPractice: 'Use "kubectl rollout restart" when updating external ConfigMaps or Vault secrets, as pods do not automatically reload environment variables.'
  },
  {
    id: 'k8s-kustomize-manifests',
    category: 'kubernetes',
    categoryLabel: 'Kubernetes (K8s)',
    subcategory: 'GitOps & Environment Overlays',
    title: 'Kustomize Template-Free Manifest Generation',
    command: 'kubectl kustomize ./overlays/production\nkubectl apply -k ./overlays/production',
    explanation: 'Natively processes Kustomize overlays, patching base manifests for different environments (dev vs prod) without complex templating engines like Helm.',
    flags: [
      { flag: '-k <dir>', desc: 'Processes directory containing kustomization.yaml' }
    ],
    example: 'kubectl diff -k ./overlays/production\nkubectl apply -k ./overlays/production',
    bestPractice: 'Kustomize is built into kubectl; use it for pure Kubernetes-native environment overlay management in GitOps tools like ArgoCD.'
  },
  {
    id: 'k8s-debug-ephemeral',
    category: 'kubernetes',
    categoryLabel: 'Kubernetes (K8s)',
    subcategory: 'Advanced Troubleshooting',
    title: 'Attach Ephemeral Debug Container to Distroless Pod',
    command: 'kubectl debug -it <pod-name> --image=nicolaka/netshoot --target=<container-name>',
    explanation: 'Attaches an ephemeral container containing rich debugging tools (curl, tcpdump, dig, strace) into an already-running production pod, sharing its Linux network and process namespaces without restarting the pod.',
    flags: [
      { flag: '--image', desc: 'Troubleshooting toolkit container image (e.g. netshoot, busybox)' },
      { flag: '--target', desc: 'Target container name to share process namespaces with' }
    ],
    example: 'kubectl debug -it order-api-8f3e-x1z --image=nicolaka/netshoot -- target=api',
    bestPractice: 'Use "kubectl debug" to troubleshoot lean Distroless or scratch containers that lack a local shell or package manager.'
  },
  {
    id: 'k8s-kind-cluster-bootstrap',
    category: 'kubernetes',
    categoryLabel: 'Kubernetes (K8s)',
    subcategory: 'Cluster Setup & Bootstrapping',
    title: 'Provision Local Multi-Node Clusters with kind',
    command: 'kind create cluster --name dev-cluster --config kind-config.yaml\nkubectl cluster-info --context kind-dev-cluster\nkind get clusters\nkind delete cluster --name dev-cluster',
    explanation: 'Boots a local multi-node Kubernetes cluster using Docker containers as nodes. Allows testing multi-node scheduling, node taints, and ingress locally without cloud costs.',
    flags: [
      { flag: '--name', desc: 'Sets cluster context name (defaults to "kind")' },
      { flag: '--config', desc: 'Path to multi-node kind YAML topology configuration' }
    ],
    example: 'kind create cluster --name k8s-lab --config ./cluster.yaml\nkubectl get nodes -o wide',
    bestPractice: 'Use kind for local development and CI/CD pipelines to validate Kubernetes manifests and Helm charts before pushing to staging.'
  },
  {
    id: 'k8s-configmap-secret-imperative',
    category: 'kubernetes',
    categoryLabel: 'Kubernetes (K8s)',
    subcategory: 'Configuration & Secrets',
    title: 'Create ConfigMaps and Secrets Imperatively',
    command: 'kubectl create configmap app-config --from-literal=ENVIRONMENT=production --from-file=config.properties\nkubectl create secret generic app-secrets --from-literal=DB_PASSWORD=SuperSecret123!\nkubectl get configmap,secret',
    explanation: 'Creates configuration maps and base64-encoded secrets directly from terminal arguments or local configuration files without committing sensitive credentials into Git.',
    flags: [
      { flag: '--from-literal', desc: 'Specify key-value pairs directly from CLI arguments' },
      { flag: '--from-file', desc: 'Load key and contents from a local file on disk' }
    ],
    example: 'kubectl create secret generic db-creds --from-literal=user=postgres --from-literal=password=p@ssword\nkubectl describe secret db-creds',
    bestPractice: 'Never commit plain Secret YAML files into Git. Use SealedSecrets, External Secrets Operator, or AWS Secrets Manager CSI driver in production.'
  },
  {
    id: 'k8s-autoscale-hpa',
    category: 'kubernetes',
    categoryLabel: 'Kubernetes (K8s)',
    subcategory: 'Autoscaling & Scaling',
    title: 'Horizontal Pod Autoscaler (HPA) Management',
    command: 'kubectl autoscale deployment api-gateway --cpu-percent=70 --min=2 --max=10\nkubectl get hpa -w\nkubectl describe hpa api-gateway',
    explanation: 'Configures automatic horizontal scaling of Pod replicas based on CPU utilization scraped by Metrics Server. The controller dynamically scales replicas up during load spikes and scales down when load subsides.',
    flags: [
      { flag: '--cpu-percent', desc: 'Target average CPU utilization percentage across all Pods' },
      { flag: '--min', desc: 'Minimum Pod replica count floor' },
      { flag: '--max', desc: 'Maximum Pod replica count ceiling' }
    ],
    example: 'kubectl autoscale deployment auth-service --cpu-percent=60 --min=3 --max=15\nkubectl get hpa auth-service',
    bestPractice: 'Ensure all auto-scaled containers define "resources.requests.cpu", otherwise the Metrics Server cannot compute percentage utilization and HPA will fail.'
  },
  {
    id: 'k8s-helm-package-release',
    category: 'kubernetes',
    categoryLabel: 'Kubernetes (K8s)',
    subcategory: 'Package Management (Helm)',
    title: 'Helm Chart Lifecycle & Atomic Rollbacks',
    command: 'helm repo add bitnami https://charts.bitnami.com/bitnami\nhelm install my-app ./charts/my-app -f values-prod.yaml\nhelm upgrade my-app ./charts/my-app --set replicaCount=5\nhelm history my-app\nhelm rollback my-app 1',
    explanation: 'Manages Kubernetes applications as versioned Helm chart releases. Packages templates, injects values, tracks deployment revisions, and performs atomic multi-resource rollbacks.',
    flags: [
      { flag: '-f, --values', desc: 'Specify external values YAML file to override template defaults' },
      { flag: '--set', desc: 'Set individual template values directly from the command line' }
    ],
    example: 'helm upgrade --install api ./chart -f values.prod.yaml --wait --timeout 5m\nhelm rollback api 2',
    bestPractice: 'Always use "--dry-run --debug" with helm install/upgrade before executing in production to inspect the fully rendered manifests.'
  },

  // ==========================================
  // JENKINS CLI & PIPELINE COMMANDS
  // ==========================================
  {
    id: 'jenkins-cli-download-auth',
    category: 'jenkins',
    categoryLabel: 'Jenkins CI/CD',
    subcategory: 'CLI & Authentication',
    title: 'Download & Connect to Jenkins CLI',
    command: 'wget http://<jenkins-url>:8080/jnlpJars/jenkins-cli.jar\njava -jar jenkins-cli.jar -s http://<jenkins-url>:8080/ -auth admin:API_TOKEN who-am-i',
    explanation: 'Downloads the official Jenkins CLI JAR directly from your Jenkins controller and verifies API token authentication.',
    flags: [
      { flag: '-s <URL>', desc: 'Specifies the base URL of the Jenkins controller' },
      { flag: '-auth <user:token>', desc: 'Supplies API token generated from Jenkins user configuration' }
    ],
    example: 'java -jar jenkins-cli.jar -s http://localhost:8080 -auth admin:11a5f4e... list-jobs',
    bestPractice: 'Never use plain passwords with Jenkins CLI; always generate and use scoped User API Tokens.'
  },
  {
    id: 'jenkins-build-job-stream',
    category: 'jenkins',
    categoryLabel: 'Jenkins CI/CD',
    subcategory: 'Job Execution',
    title: 'Trigger Build with Parameters via CLI & cURL',
    command: 'java -jar jenkins-cli.jar -s http://localhost:8080 -auth admin:TOKEN build "Microservice-Deploy" -p ENV=staging -p GIT_TAG=v1.4.0 -v -f',
    explanation: 'Triggers a parameterized Jenkins pipeline build and streams console output live in terminal until completion.',
    flags: [
      { flag: '-p <KEY=VAL>', desc: 'Pass parameter value to the parameterized pipeline' },
      { flag: '-v', desc: 'Verbose output' },
      { flag: '-f', desc: 'Follows build and exits with the same status code as the job' }
    ],
    example: 'curl -X POST http://admin:TOKEN@jenkins:8080/job/build-api/buildWithParameters?BRANCH=main',
    bestPractice: 'Use the -f flag in terminal automation scripts so the calling script fails if the Jenkins build fails.'
  },
  {
    id: 'jenkins-safe-restart-quiesce',
    category: 'jenkins',
    categoryLabel: 'Jenkins CI/CD',
    subcategory: 'Administration',
    title: 'Jenkins Safe Restart & Quiescing',
    command: 'java -jar jenkins-cli.jar -s http://localhost:8080 -auth admin:TOKEN safe-restart\n# OR via HTTP POST:\ncurl -X POST http://admin:TOKEN@localhost:8080/safeRestart',
    explanation: 'Puts Jenkins in quiet mode, waiting for all currently running pipeline builds to finish gracefully before restarting the controller daemon.',
    flags: [
      { flag: 'safe-restart', desc: 'Waits for running jobs to finish before restarting' },
      { flag: 'restart', desc: 'Immediately terminates running jobs and restarts (use with caution)' }
    ],
    example: 'curl -X POST -u "admin:token" "http://localhost:8080/safeRestart"',
    bestPractice: 'Always use safe-restart in production environments to avoid corrupting workspace caches or halting in-flight deployments.'
  },
  {
    id: 'jenkins-plugin-mgmt-headless',
    category: 'jenkins',
    categoryLabel: 'Jenkins CI/CD',
    subcategory: 'Plugin Management',
    title: 'List & Install Plugins Headless',
    command: 'java -jar jenkins-cli.jar -s http://localhost:8080 -auth admin:TOKEN list-plugins\njava -jar jenkins-cli.jar -s http://localhost:8080 -auth admin:TOKEN install-plugin git docker-workflow kubernetes -restart',
    explanation: 'Lists installed plugins, checks for updates, and installs required plugins directly from the command line with automated restart.',
    flags: [
      { flag: '-deploy', desc: 'Deploys plugins immediately without requiring a full controller restart' },
      { flag: '-restart', desc: 'Schedules a safe restart after installation completes' }
    ],
    example: 'java -jar jenkins-cli.jar -s http://localhost:8080 -auth admin:TOKEN install-plugin sonar -deploy',
    bestPractice: 'Automate plugin installation using Jenkins Configuration as Code (JCasC) for reproducible CI infrastructure.'
  },
  {
    id: 'jenkins-declarative-syntax-prod',
    category: 'jenkins',
    categoryLabel: 'Jenkins CI/CD',
    subcategory: 'Pipeline-as-Code',
    title: 'Declarative Pipeline Boilerplate (Jenkinsfile)',
    command: `pipeline {
    agent { docker { image 'node:20-alpine' } }
    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        APP_VERSION = "\${env.BUILD_NUMBER}"
    }
    stages {
        stage('Test') {
            steps { sh 'npm ci && npm test' }
        }
        stage('Build Docker') {
            steps { sh 'docker build -t app:\${APP_VERSION} .' }
        }
    }
    post {
        failure { echo 'Pipeline Failed! Sending notification...' }
        always { cleanWs() }
    }
}`,
    explanation: 'Standard enterprise Declarative Jenkinsfile structure featuring dynamic Docker agent isolation, credential injection, and post-build cleanup.',
    flags: [
      { flag: 'agent { docker }', desc: 'Runs all stages inside an isolated disposable Docker container' },
      { flag: 'cleanWs()', desc: 'Deletes temporary workspace files to prevent runner disk full crashes' }
    ],
    example: 'cleanWs deleteDirs: true, notFailBuild: true',
    bestPractice: 'Always include cleanWs() inside post { always } to prevent agent disk full incidents.'
  },
  {
    id: 'jenkins-rhel-install-systemd',
    category: 'jenkins',
    categoryLabel: 'Jenkins CI/CD',
    subcategory: 'Setup & Installation',
    title: 'RHEL/CentOS Linux Service Installation',
    command: `# 1. Add Jenkins repo & key\nsudo curl -o /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo\nsudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key\n\n# 2. Install Java 17 prerequisite & Jenkins\nsudo yum install fontconfig java-17-openjdk jenkins -y\n\n# 3. Reload systemd & enable on boot\nsudo systemctl daemon-reload\nsudo systemctl start jenkins\nsudo systemctl enable jenkins`,
    explanation: 'Official Enterprise Red Hat installation sequence: verifies Java 17 OpenJDK prerequisite, adds trusted repository signing key, and configures systemd auto-start.',
    flags: [
      { flag: 'systemctl daemon-reload', desc: 'Reloads systemd manager configuration to recognize newly installed unit' },
      { flag: 'systemctl enable jenkins', desc: 'Creates symlinks to automatically start Jenkins upon server reboots' }
    ],
    example: 'sudo systemctl status jenkins && ps -ef | grep jenkins',
    bestPractice: 'Always confirm java -version is Java 17 before installing; Jenkins runs on the JVM and will not start without a compatible runtime.'
  },
  {
    id: 'jenkins-initial-admin-unlock',
    category: 'jenkins',
    categoryLabel: 'Jenkins CI/CD',
    subcategory: 'Setup & Security',
    title: 'Retrieve Initial Setup Password',
    command: 'sudo cat /var/lib/jenkins/secrets/initialAdminPassword',
    explanation: 'Outputs the auto-generated 32-character cryptographic administrator password required to unlock Jenkins on first launch in the browser setup wizard.',
    flags: [
      { flag: 'initialAdminPassword', desc: 'One-time setup key stored in protected root/jenkins file system on disk' }
    ],
    example: 'sudo cat /var/lib/jenkins/secrets/initialAdminPassword # Paste into http://<ip>:8080 unlock screen',
    bestPractice: 'Never delete this file before completing setup; immediately create a primary named admin account during the wizard.'
  },
  {
    id: 'jenkins-cron-syntax-cheatsheet',
    category: 'jenkins',
    categoryLabel: 'Jenkins CI/CD',
    subcategory: 'Build Triggers',
    title: 'Jenkins 5-Field Cron Schedule Syntax',
    command: `# Minute (0-59) | Hour (0-23) | Day of Month (1-31) | Month (1-12) | Day of Week (0-7 Sun=0/7)\n\n*/5 * * * *      # Every 5 minutes\n10 */5 * * *     # At minute 10 of every 5th hour\n* */2 * * 1-5    # 1st minute of every 2 hours, Mon through Fri\nH 2 * * *        # Daily between 2:00-2:59 AM with hash jitter`,
    explanation: 'Cron scheduling specification used for Build Periodically and Poll SCM triggers in Jenkins jobs.',
    flags: [
      { flag: 'H (Hash)', desc: 'Distributes scheduled jobs across time intervals based on job hash to prevent server CPU spikes' },
      { flag: '*/X', desc: 'Executes every X steps of the specified field (e.g. */15 = every 15 minutes)' }
    ],
    example: 'H/15 * * * * (Polls SCM every 15 minutes with load jitter)',
    bestPractice: 'Prefer event-driven GitHub Webhooks over Poll SCM whenever network connectivity allows.'
  },
  {
    id: 'jenkins-selenium-maven-headless',
    category: 'jenkins',
    categoryLabel: 'Jenkins CI/CD',
    subcategory: 'Automated Testing',
    title: 'Headless Selenium Test Execution & JUnit Report',
    command: `# 1. Execute Maven Selenium test suite headlessly\nmvn clean test -Dtest=SimpleWebTest\n\n# 2. In Declarative Jenkinsfile post block:\npost {\n    always {\n        junit '**/target/surefire-reports/*.xml'\n    }\n}`,
    explanation: 'Runs automated browser tests via Maven Surefire plugin in headless mode on Linux CI runners and archives JUnit XML reports for trend analysis.',
    flags: [
      { flag: 'junit \'**/*.xml\'', desc: 'Publishes test results to generate interactive pass/fail trend graphs in Jenkins dashboard' },
      { flag: 'post { always }', desc: 'Ensures test reports publish even when test assertions fail' }
    ],
    example: 'sh \'xvfb-run mvn test\' # For virtual display X11 emulation',
    bestPractice: 'Always place driver.quit() in @After teardown method to prevent orphan Chrome processes from exhausting CI server RAM.'
  },
  {
    id: 'jenkins-declarative-input-approval',
    category: 'jenkins',
    categoryLabel: 'Jenkins CI/CD',
    subcategory: 'Pipeline-as-Code',
    title: 'Production Approval Gate (input Step)',
    command: `stage('Production Approval Gate') {
    steps {
        timeout(time: 2, unit: 'HOURS') {
            input message: 'Promote release artifact to AWS Production?',
                  ok: 'Approve & Deploy',
                  submitter: 'release-leads,sre-team'
        }
    }
}`,
    explanation: 'Pauses pipeline execution at the deployment stage until an authorized user in the submitter group explicitly approves promotion.',
    flags: [
      { flag: 'timeout()', desc: 'Automatically aborts pipeline if unattended after specified duration, freeing executors' },
      { flag: 'submitter', desc: 'Enforces least-privilege RBAC by restricting who can click Approve' }
    ],
    example: 'input message: "Proceed with production release?"',
    bestPractice: 'Always wrap interactive input steps with a timeout to avoid indefinite build queue deadlocks.'
  },

  // ==========================================
  // AWS CLI COMMANDS
  // ==========================================
  {
    id: 'aws-ecr-login-push',
    category: 'aws',
    categoryLabel: 'AWS Cloud CLI',
    subcategory: 'Container Registry (ECR)',
    title: 'Authenticate & Push to Amazon ECR',
    command: 'aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com\n\ndocker tag myapp:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/myapp:sha-8f3e1a\ndocker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/myapp:sha-8f3e1a',
    explanation: 'Generates a temporary 12-hour STS authentication token and streams it into Docker login stdin, then pushes an immutably tagged image to ECR.',
    flags: [
      { flag: 'get-login-password', desc: 'Retrieves authentication token directly without printing plain secret to console' },
      { flag: '--password-stdin', desc: 'Reads password safely from standard input' }
    ],
    example: 'aws ecr describe-repositories --region us-east-1',
    bestPractice: 'Never push images tagged as "latest" to production ECR repositories; tag images with the immutable Git commit SHA.'
  },
  {
    id: 'aws-eks-kubeconfig',
    category: 'aws',
    categoryLabel: 'AWS Cloud CLI',
    subcategory: 'Amazon EKS',
    title: 'Update Kubeconfig for Amazon EKS Cluster',
    command: 'aws eks update-kubeconfig --region us-east-1 --name production-eks-cluster',
    explanation: 'Configures your local ~/.kube/config file to authenticate with an Amazon EKS cluster using AWS IAM credentials via aws-iam-authenticator.',
    flags: [
      { flag: '--region', desc: 'AWS Region where cluster is hosted' },
      { flag: '--name', desc: 'Name of the Amazon EKS cluster' },
      { flag: '--alias', desc: 'Optional alias name for the kubeconfig context' }
    ],
    example: 'kubectl get nodes',
    bestPractice: 'Ensure the calling IAM user or role is registered in the EKS aws-auth ConfigMap or has an EKS Access Entry configured.'
  },
  {
    id: 'aws-s3-sync',
    category: 'aws',
    categoryLabel: 'AWS Cloud CLI',
    subcategory: 'Amazon S3 Storage',
    title: 'High-Performance S3 Sync & Prune',
    command: 'aws s3 sync ./dist s3://my-prod-static-website/ --delete --exact-timestamps --cache-control "max-age=31536000,public"',
    explanation: 'Recursively synchronizes local build artifacts to an S3 bucket, removing stale remote files and applying cache-control headers.',
    flags: [
      { flag: '--delete', desc: 'Removes files existing in the destination bucket but missing locally' },
      { flag: '--exact-timestamps', desc: 'Compares file modification times rather than file size' }
    ],
    example: 'aws s3 ls s3://my-prod-static-website/ --human-readable --summarize',
    bestPractice: 'Use --delete cautiously; always test with --dryrun first to ensure you do not wipe unintended production objects.'
  },
  {
    id: 'aws-ec2-describe',
    category: 'aws',
    categoryLabel: 'AWS Cloud CLI',
    subcategory: 'Amazon EC2',
    title: 'Filter Running Instances with JMESPath',
    command: 'aws ec2 describe-instances \\\n  --filters "Name=instance-state-name,Values=running" \\\n  --query "Reservations[*].Instances[*].[InstanceId,PrivateIpAddress,PublicIpAddress,Tags[?Key==\'Name\'].Value | [0]]" \\\n  --output table',
    explanation: 'Leverages server-side filters and client-side JMESPath queries to produce a clean, tabular overview of running EC2 instances.',
    flags: [
      { flag: '--filters', desc: 'Server-side filtering criteria' },
      { flag: '--query', desc: 'Client-side JMESPath syntax to reshape JSON responses' },
      { flag: '--output table', desc: 'Format results into a human-readable ASCII table' }
    ],
    example: 'aws ec2 stop-instances --instance-ids i-0a1b2c3d4e5f6g7h8',
    bestPractice: 'Use --query to filter output on the client rather than piping massive JSON dumps into grep or awk.'
  },
  {
    id: 'aws-budgets-guardrail',
    category: 'aws',
    categoryLabel: 'AWS Cloud CLI',
    subcategory: 'Cost Governance & Budgets',
    title: 'Deploy $1.00 USD Budget Alert Guardrail',
    command: 'aws budgets create-budget \\\n  --account-id $(aws sts get-caller-identity --query Account --output text) \\\n  --budget file://budget.json \\\n  --notifications-with-subscribers file://notifications.json',
    explanation: 'Creates a proactive cost guardrail that monitors actual and forecasted spending, triggering instantaneous email alerts when spend exceeds $1.00 USD.',
    flags: [
      { flag: '--account-id', desc: '12-digit AWS account number' },
      { flag: '--budget', desc: 'Path to JSON file specifying limit amount, unit, and monthly interval' },
      { flag: '--notifications-with-subscribers', desc: 'Path to notification rules defining email subscriber endpoints' }
    ],
    example: 'aws budgets describe-budgets --account-id $(aws sts get-caller-identity --query Account --output text)',
    bestPractice: 'Always configure a $1.00 budget alert immediately after creating a new AWS account before provisioning any cloud infrastructure.'
  },
  {
    id: 'aws-cost-explorer-triage',
    category: 'aws',
    categoryLabel: 'AWS Cloud CLI',
    subcategory: 'Billing & Cost Explorer',
    title: 'Forensic Billing Breakdown by Service & Region',
    command: 'aws ce get-cost-and-usage \\\n  --time-period Start=$(date -d "7 days ago" +%Y-%m-%d),End=$(date +%Y-%m-%d) \\\n  --granularity DAILY \\\n  --metrics "UnblendedCost" \\\n  --group-by Type=DIMENSION,Key=SERVICE Type=DIMENSION,Key=REGION',
    explanation: 'Queries the Cost Explorer API to extract daily unblended cost metrics grouped by service and region, isolating unexpected charges.',
    flags: [
      { flag: '--time-period', desc: 'Start and end date range (YYYY-MM-DD)' },
      { flag: '--granularity', desc: 'DAILY or MONTHLY aggregation window' },
      { flag: '--group-by', desc: 'Multi-dimensional grouping by SERVICE, REGION, or USAGE_TYPE' }
    ],
    example: 'aws ce get-dimension-values --time-period Start=2026-11-01,End=2026-11-05 --dimension SERVICE',
    bestPractice: 'Use Cost Explorer daily grouping to catch unexpected charges before they compound into large end-of-month bills.'
  },
  {
    id: 'aws-idle-resources-cleanup',
    category: 'aws',
    categoryLabel: 'AWS Cloud CLI',
    subcategory: 'Cost Optimization & Cleanup',
    title: 'Audit & Release Idle Elastic IPs and Orphan EBS Volumes',
    command: '# 1. List unattached Elastic IPs incurring hourly penalties:\naws ec2 describe-addresses --query "Addresses[?InstanceId==null].{IP:PublicIp,AllocId:AllocationId}" --output table\n\n# 2. List unattached EBS volumes:\naws ec2 describe-volumes --filters Name=status,Values=available --query "Volumes[*].{ID:VolumeId,Size:Size,Created:CreateTime}" --output table\n\n# 3. Release idle Elastic IP:\naws ec2 release-address --allocation-id <AllocationId>',
    explanation: 'Discovers and purges idle Elastic IPs (billed at $0.005/hr when unattached) and orphan EBS storage volumes ($0.08-$0.10/GB/month) left behind by stopped or terminated EC2 instances.',
    flags: [
      { flag: '--filters', desc: 'Filter criteria (e.g. status=available for unattached volumes)' },
      { flag: '--query', desc: 'JMESPath filter isolating unattached network interfaces and disks' }
    ],
    example: 'aws ec2 delete-volume --volume-id vol-0123456789abcdef0',
    bestPractice: 'Stopping an EC2 instance does NOT stop storage fees; always delete orphan EBS volumes and release unattached Elastic IPs.'
  },
  {
    id: 'aws-vpc-custom-setup',
    category: 'aws',
    categoryLabel: 'AWS Cloud CLI',
    subcategory: 'Amazon VPC Networking',
    title: 'Create Custom VPC, Subnets & Internet Gateway',
    command: '# 1. Create VPC:\nVPC_ID=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 --query "Vpc.VpcId" --output text)\n\n# 2. Create Public Subnet:\nSUB_ID=$(aws ec2 create-subnet --vpc-id $VPC_ID --cidr-block 10.0.1.0/24 --availability-zone us-east-1a --query "Subnet.SubnetId" --output text)\n\n# 3. Attach Internet Gateway:\nIGW_ID=$(aws ec2 create-internet-gateway --query "InternetGateway.InternetGatewayId" --output text)\naws ec2 attach-internet-gateway --vpc-id $VPC_ID --internet-gateway-id $IGW_ID',
    explanation: 'Builds a production-ready custom VPC with a /16 CIDR block, creates a /24 subnet (251 usable IPs), and attaches an Internet Gateway for public connectivity.',
    flags: [
      { flag: '--cidr-block', desc: 'IPv4 network address range in CIDR notation' },
      { flag: '--availability-zone', desc: 'Physical AZ where the subnet is pinned' }
    ],
    example: 'aws ec2 create-route --route-table-id rtb-12345 --destination-cidr-block 0.0.0.0/0 --gateway-id igw-12345',
    bestPractice: 'Always use non-overlapping RFC 1918 CIDR blocks (10.0.0.0/16, 172.16.0.0/16) to ensure future VPC Peering compatibility.'
  },
  {
    id: 'aws-vpc-gateway-endpoint',
    category: 'aws',
    categoryLabel: 'AWS Cloud CLI',
    subcategory: 'Amazon VPC Endpoints',
    title: 'Provision Free VPC Gateway Endpoint for Amazon S3',
    command: 'aws ec2 create-vpc-endpoint \\\n  --vpc-id <VpcId> \\\n  --vpc-endpoint-type Gateway \\\n  --service-name com.amazonaws.us-east-1.s3 \\\n  --route-table-ids <PrivateRouteTableId>',
    explanation: 'Creates a 100% free VPC Gateway Endpoint for Amazon S3, injecting prefix list routes directly into private subnet route tables to bypass expensive NAT Gateway data processing fees.',
    flags: [
      { flag: '--vpc-endpoint-type Gateway', desc: 'Specifies free Gateway Endpoint (supported for S3 and DynamoDB only)' },
      { flag: '--route-table-ids', desc: 'Route tables where S3 prefix list routes are automatically injected' }
    ],
    example: 'aws ec2 describe-vpc-endpoints --filters Name=vpc-id,Values=vpc-0123456789abcdef0',
    bestPractice: 'Never route high-volume S3 database backups through a NAT Gateway ($0.045/GB); always use a free S3 Gateway Endpoint.'
  },
  {
    id: 'aws-transit-gateway-hub',
    category: 'aws',
    categoryLabel: 'AWS Cloud CLI',
    subcategory: 'Hybrid & Multi-VPC Routing',
    title: 'Deploy AWS Transit Gateway Central Regional Router',
    command: 'aws ec2 create-transit-gateway \\\n  --description "Corporate Central Hub" \\\n  --options AmazonSideAsn=64512,AutoAcceptSharedAttachments=enable\n\naws ec2 create-transit-gateway-vpc-attachment \\\n  --transit-gateway-id tgw-0123456789abcdef0 \\\n  --vpc-id vpc-0123456789abcdef0 \\\n  --subnet-ids subnet-11111111 subnet-22222222',
    explanation: 'Instantiates a regional Transit Gateway hub that simplifies multi-VPC connectivity from a complex N*(N-1)/2 mesh into a scalable hub-and-spoke star topology.',
    flags: [
      { flag: '--options', desc: 'BGP ASN and attachment auto-accept configuration' },
      { flag: '--subnet-ids', desc: 'Subnets where Transit Gateway ENIs are placed for cross-VPC routing' }
    ],
    example: 'aws ec2 describe-transit-gateways --transit-gateway-ids tgw-0123456789abcdef0',
    bestPractice: 'Use Transit Gateway route tables to create separate routing domains (e.g. isolating Dev from Prod) across accounts.'
  }
,
{
  "id": "ng-generate-standalone",
  "category": "angular",
  "categoryLabel": "Angular CLI",
  "subcategory": "Component & Architecture Generation",
  "title": "Generate Standalone Component with Scoped Styles",
  "command": "ng generate component components/user-profile --standalone --style=scss --change-detection=OnPush",
  "explanation": "Generates a modern standalone component declaring direct imports and configured with OnPush change detection strategy for optimal rendering performance.",
  "flags": [
    {
      "flag": "--standalone",
      "desc": "Creates component without NgModule dependency (default in Angular 17+)"
    },
    {
      "flag": "--change-detection=OnPush",
      "desc": "Sets ChangeDetectionStrategy.OnPush for fine-grained dirty checking"
    },
    {
      "flag": "--style=scss",
      "desc": "Configures SCSS preprocessor for scoped ViewEncapsulation styling"
    }
  ],
  "example": "npx ng g c components/order-table --standalone --inline-template=false",
  "bestPractice": "Always use --change-detection=OnPush for performance-critical table views and complex component subtrees."
},
{
  "id": "ng-build-production",
  "category": "angular",
  "categoryLabel": "Angular CLI",
  "subcategory": "Production Compilation",
  "title": "Compile Production Bundle with Optimization & Budgets",
  "command": "ng build --configuration=production",
  "explanation": "Invokes the Ivy / esbuild compiler in production mode, applying Ahead-of-Time (AOT) compilation, tree-shaking, minification, and verifying bundle size budgets.",
  "flags": [
    {
      "flag": "--configuration=production",
      "desc": "Enables AOT, Dead Code Elimination, and production environment replacement"
    },
    {
      "flag": "--source-map=false",
      "desc": "Excludes source maps from public production output for IP protection"
    },
    {
      "flag": "--stats-json",
      "desc": "Generates webpack/esbuild bundle statistics report for webpack-bundle-analyzer"
    }
  ],
  "example": "npx ng build --configuration=production --stats-json",
  "bestPractice": "Configure strict bundle size budgets (e.g. maximum initial 350kb) in angular.json to prevent bundle bloat."
},
{
  "id": "node-inspect-debug",
  "category": "nodejs",
  "categoryLabel": "Node.js & npm",
  "subcategory": "Debugging & Performance Profiling",
  "title": "Start Node with Chrome DevTools Remote Inspector",
  "command": "node --inspect=0.0.0.0:9229 dist/server.js",
  "explanation": "Opens the V8 debugging port on 9229, enabling Chrome DevTools (chrome://inspect) to attach breakpoints, take heap memory snapshots, and profile CPU flame graphs.",
  "flags": [
    {
      "flag": "--inspect",
      "desc": "Activates inspector agent on default port 9229"
    },
    {
      "flag": "--inspect-brk",
      "desc": "Breaks on the very first line of application code to debug initialization"
    },
    {
      "flag": "--max-old-space-size=4096",
      "desc": "Increases V8 maximum heap allocation to 4 GB for data-heavy workloads"
    }
  ],
  "example": "node --inspect --max-old-space-size=2048 server.js",
  "bestPractice": "Never expose port 9229 to public WAN in production; tunnel via SSH: ssh -L 9229:localhost:9229 user@remote."
},
{
  "id": "node-threadpool-scale",
  "category": "nodejs",
  "categoryLabel": "Node.js & npm",
  "subcategory": "Concurrency & Threading",
  "title": "Scale libuv Thread Pool for Cryptography & File I/O",
  "command": "UV_THREADPOOL_SIZE=16 node server.js",
  "explanation": "Overrides the default 4-thread libuv pool, allowing up to 16 concurrent blocking operations (crypto pbkdf2, bcrypt, fs, and DNS lookups) to execute in parallel without stalling.",
  "flags": [
    {
      "flag": "UV_THREADPOOL_SIZE",
      "desc": "Environment variable configuring worker threads (min: 1, max: 1024)"
    }
  ],
  "example": "UV_THREADPOOL_SIZE=8 node --enable-source-maps dist/index.js",
  "bestPractice": "Must be set as an OS environment variable BEFORE the Node process initializes; setting in JS code has zero effect."
},
{
  "id": "curl-idempotent-api",
  "category": "nodejs",
  "categoryLabel": "Node.js & npm",
  "subcategory": "API Testing & Idempotency",
  "title": "Test Idempotency-Key Header & 304 ETag Caching",
  "command": "curl -i -X POST https://api.enterprise.domain/v1/checkout \\n  -H \"Content-Type: application/json\" \\n  -H \"Idempotency-Key: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d\" \\n  -d '{\"orderId\": \"ord_99\", \"amount\": 150.00}'",
  "explanation": "Simulates mobile client network retries with IETF Idempotency-Key header; repeat calls return cached 201 response with X-Cache-Lookup: IDEMPOTENCY-HIT.",
  "flags": [
    {
      "flag": "-i",
      "desc": "Includes HTTP response headers in terminal output"
    },
    {
      "flag": "-H \"If-None-Match: ...\"",
      "desc": "Tests conditional 304 Not Modified cache validation"
    }
  ],
  "example": "curl -i https://api.domain/v1/products -H \"If-None-Match: W/\"hash123\"\"",
  "bestPractice": "Verify that retried requests with identical Idempotency-Key return cached response without double charges."
},
{
  "id": "psql-explain-analyze",
  "category": "database",
  "categoryLabel": "Database (SQL & Mongo)",
  "subcategory": "Query Profiling & Indexing",
  "title": "Profile Query Execution Plan with EXPLAIN ANALYZE",
  "command": "psql -U postgres -d enterprise_db -c \"EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM orders WHERE user_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' AND created_at &gt;= '2025-01-01';\"",
  "explanation": "Executes the query inside PostgreSQL and outputs the real execution plan, distinguishing between slow Sequential Scans and fast Index Scans, alongside shared buffer cache hit rates.",
  "flags": [
    {
      "flag": "ANALYZE",
      "desc": "Actually executes the query to collect actual time and row count statistics"
    },
    {
      "flag": "BUFFERS",
      "desc": "Displays shared buffer cache hits (RAM) versus physical disk reads"
    }
  ],
  "example": "psql -d prod -c \"CREATE INDEX CONCURRENTLY idx_orders_user ON orders(user_id);\"",
  "bestPractice": "Always use CREATE INDEX CONCURRENTLY on live production PostgreSQL databases to avoid locking tables against writes."
},
{
  "id": "prisma-migrate-studio",
  "category": "database",
  "categoryLabel": "Database (SQL & Mongo)",
  "subcategory": "ORM Schema & Migrations",
  "title": "Execute Prisma Database Migration & Launch Studio",
  "command": "npx prisma migrate dev --name init_schema\nnpx prisma studio --port 5555",
  "explanation": "Generates SQL migration files from schema.prisma, applies them to the database, updates the generated TypeScript client, and launches a visual database inspection browser on port 5555.",
  "flags": [
    {
      "flag": "migrate dev",
      "desc": "Applies migrations in development and updates Prisma Client"
    },
    {
      "flag": "migrate deploy",
      "desc": "Applies pending migrations in production CI/CD pipelines without schema prompt"
    }
  ],
  "example": "npx prisma generate && npx prisma db push",
  "bestPractice": "Use prisma migrate deploy in production containers rather than migrate dev to prevent unintended schema resets."
}];
