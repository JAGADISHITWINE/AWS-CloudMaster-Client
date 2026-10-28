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
  // Missing Git Commands
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
  }
];
