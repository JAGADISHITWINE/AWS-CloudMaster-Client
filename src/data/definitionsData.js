// Comprehensive DevOps, Cloud & System Administration Definitions Glossary
// Designed for beginners to mid-level engineers to learn concepts one by one with zero confusion.

export const DEFINITIONS_DATA = [
  // =========================================================================
  // 1. LINUX & SHELL SCRIPTING (THE PREREQUISITE FOUNDATION)
  // =========================================================================
  {
    term: "Kernel",
    category: "linux",
    categoryLabel: "Linux & OS",
    level: "Beginner",
    definition: "The core program at the heart of the operating system that controls all hardware resources (CPU, RAM, disks, network cards) and acts as the bridge between software applications and physical machine hardware.",
    whyItMatters: "Every container (Docker) directly shares the host Linux kernel rather than booting its own.",
    example: "Run `uname -r` in terminal to see your active Linux kernel version (e.g., `6.8.0-generic`)."
  },
  {
    term: "Shell",
    category: "linux",
    categoryLabel: "Linux & OS",
    level: "Beginner",
    definition: "A command-line interpreter program (such as Bash or Zsh) that accepts human-typed text commands, interprets them, and instructs the operating system kernel to execute them.",
    whyItMatters: "All CI/CD pipelines (Jenkins, GitHub Actions, GitLab CI) execute shell scripts under the hood.",
    example: "`echo $SHELL` typically outputs `/bin/bash` or `/bin/zsh`."
  },
  {
    term: "Inode (Index Node)",
    category: "linux",
    categoryLabel: "Linux & OS",
    level: "Intermediate",
    definition: "A data structure on a Linux filesystem that stores all metadata about a file (file size, permissions, owner, timestamps, disk block pointers), except for its filename and actual content data.",
    whyItMatters: "A disk can run out of space even with gigabytes of free storage if all available inodes are exhausted by millions of tiny files.",
    example: "Run `df -i` to view free filesystem inode capacity."
  },
  {
    term: "Linux File Permissions (rwx)",
    category: "linux",
    categoryLabel: "Linux & OS",
    level: "Beginner",
    definition: "A 3-tier security model governing who can Read (r=4), Write (w=2), or Execute (x=1) a file across three user classes: Owner (User), Group, and Others.",
    whyItMatters: "Misconfigured permissions cause 'Permission denied' in Docker volume mounts and Jenkins workspace builds.",
    example: "`chmod 755 script.sh` grants Owner full access (7=4+2+1) and Group/Others read+execute access (5=4+1)."
  },
  {
    term: "Process ID (PID)",
    category: "linux",
    categoryLabel: "Linux & OS",
    level: "Beginner",
    definition: "A unique numerical identifier assigned by the Linux kernel to every running process from the moment it is spawned until it terminates.",
    whyItMatters: "Used to monitor, inspect, and kill background services, or debug zombie/hung processes.",
    example: "`ps aux | grep nginx` reveals the PID of the running web server process; `kill -9 <PID>` terminates it."
  },
  {
    term: "Daemon",
    category: "linux",
    categoryLabel: "Linux & OS",
    level: "Beginner",
    definition: "A background computer program that runs continuously without direct user interaction, waiting to handle incoming requests or scheduled periodic tasks (often named ending in 'd', like dockerd, sshd, systemd).",
    whyItMatters: "Web servers, databases, and container engines in production run as system daemons managed by systemd.",
    example: "`sudo systemctl status docker` inspects the Docker daemon service status."
  },
  {
    term: "Standard Streams (stdin, stdout, stderr)",
    category: "linux",
    categoryLabel: "Linux & OS",
    level: "Beginner",
    definition: "The three standard input/output communication channels established when a Linux command executes: File Descriptor 0 (Standard Input), File Descriptor 1 (Standard Output), and File Descriptor 2 (Standard Error).",
    whyItMatters: "Docker and Kubernetes extract container logs by listening strictly to stdout and stderr.",
    example: "`command > output.log 2>&1` redirects both normal output (1) and error messages (2) to a single log file."
  },
  {
    term: "Pipe (|)",
    category: "linux",
    categoryLabel: "Linux & OS",
    level: "Beginner",
    definition: "A shell operator that feeds the standard output (stdout) of the command on the left directly into the standard input (stdin) of the command on the right as a stream.",
    whyItMatters: "Enables building powerful one-line data transformation pipelines in scripts.",
    example: "`cat /var/log/nginx/access.log | grep '404' | wc -l` counts how many 404 errors occurred."
  },
  {
    term: "Cron Job",
    category: "linux",
    categoryLabel: "Linux & OS",
    level: "Beginner",
    definition: "A time-based job scheduler in Unix-like operating systems that executes scripts or commands automatically at specified intervals (minute, hour, day of month, month, day of week).",
    whyItMatters: "Used for automated nightly database backups, log cleanup, and disk health monitoring.",
    example: "`0 2 * * * /backup.sh` runs the backup script every day at 2:00 AM."
  },
  {
    term: "SSH (Secure Shell)",
    category: "linux",
    categoryLabel: "Linux & OS",
    level: "Beginner",
    definition: "A cryptographic network protocol that enables secure, encrypted remote terminal login and command execution over an untrusted network using public-key cryptography.",
    whyItMatters: "The primary method engineers and Jenkins worker agents connect to Linux servers and AWS EC2 instances.",
    example: "`ssh -i id_rsa ubuntu@54.210.12.34` connects to a remote EC2 instance using an asymmetric private key."
  },

  // =========================================================================
  // 2. GIT & VERSION CONTROL (SOURCE CODE COLLABORATION)
  // =========================================================================
  {
    term: "Version Control System (VCS)",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Beginner",
    definition: "A software category that tracks and records incremental changes made to files over time, allowing developers to recall specific historical versions, revert mistakes, and collaborate concurrently.",
    whyItMatters: "Git is the decentralized VCS standard used by 95%+ of software and infrastructure teams worldwide.",
    example: "Git stores complete file snapshots in a local hidden `.git/` folder."
  },
  {
    term: "Repository (Repo)",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Beginner",
    definition: "A storage location containing all project files, subdirectories, and the complete chronological history of all commits, tags, and branches managed by Git.",
    whyItMatters: "The single source of truth for application code and Infrastructure as Code.",
    example: "A local directory with `.git/` or a remote repository hosted on GitHub or AWS CodeCommit."
  },
  {
    term: "Working Tree vs Staging Area (Index)",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Beginner",
    definition: "Working Tree is the actual directory of files on your disk you are editing. Staging Area (Index) is an intermediate holding zone where you select which specific file modifications will go into the next commit.",
    whyItMatters: "Allows staging atomic, clean commits without committing half-finished debug edits.",
    example: "Running `git add index.js` moves your edits from Working Tree to the Staging Area."
  },
  {
    term: "Commit",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Beginner",
    definition: "An immutable, cryptographic snapshot of your project's staged state at a specific point in time, identified by a 40-character SHA hash with author, timestamp, and message.",
    whyItMatters: "Commits form the Directed Acyclic Graph (DAG) that makes up Git's tamper-evident history.",
    example: "`git commit -m 'feat: implement user registration endpoint'`"
  },
  {
    term: "HEAD",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Beginner",
    definition: "A special symbolic reference pointer in Git that indicates which branch and commit your current working directory is currently checked out to.",
    whyItMatters: "Understanding HEAD prevents confusion when navigating branches or recovering lost commits.",
    example: "When on branch `main`, `HEAD` points to `refs/heads/main`."
  },
  {
    term: "Branch",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Beginner",
    definition: "A lightweight, movable 41-byte pointer to a specific commit. Creating a branch allows developers to build isolated features without affecting the stable production `main` branch.",
    whyItMatters: "Branches enable parallel team collaboration without overwriting each other's work.",
    example: "`git switch -c feature/shopping-cart` creates an isolated workspace branch."
  },
  {
    term: "Merge Conflict",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Beginner",
    definition: "An event occurring when two branches have made competing modifications to the exact same line of code in a file, forcing Git to halt and ask the human engineer to manually choose which code to keep.",
    whyItMatters: "Every software and DevOps engineer must know how to read `<<<<<<< HEAD` conflict markers and resolve them cleanly.",
    example: "Git pauses the merge and places conflict markers around the overlapping lines until you edit and stage the file."
  },
  {
    term: "Rebase",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Intermediate",
    definition: "The process of moving or reapplying a sequence of commits from your feature branch on top of the latest tip of another base branch, producing a clean, straight linear history with no merge bubbles.",
    whyItMatters: "Favored in high-velocity teams because it avoids cluttered 'Merge branch main into feature' commits.",
    example: "`git rebase origin/main` reapplies your commits one-by-one onto the newest main branch."
  },
  {
    term: "Pull Request (PR) / Merge Request",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Beginner",
    definition: "A code review and collaboration mechanism on platforms like GitHub where a developer proposes merging their feature branch into the target branch, inviting peer reviews, automated CI tests, and discussions.",
    whyItMatters: "The primary quality gate in modern software development to catch bugs and vulnerabilities before production.",
    example: "A developer opens PR #42; automated Jenkins CI tests run; senior engineers approve; PR is merged."
  },
  {
    term: "Webhook",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Intermediate",
    definition: "An automated HTTP POST callback mechanism where an event occurring in one system (e.g. `git push` to GitHub) instantly sends a JSON payload to another system (e.g. Jenkins or Slack) to trigger an automated action.",
    whyItMatters: "The invisible glue that triggers automated CI/CD builds the split-second a developer pushes code.",
    example: "GitHub sends an HTTP POST payload to `http://jenkins:8080/github-webhook/` upon push."
  },
  {
    term: "Distributed Version Control System (DVCS)",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Beginner",
    definition: "A version control architecture where every developer has a full, standalone clone of the entire repository history on their local machine, enabling offline commits, branching, and eliminating single points of failure.",
    whyItMatters: "Provides maximum flexibility and data safety: if the central server is lost, any developer's local clone can fully restore the project.",
    example: "Git is the leading DVCS, outclassing centralized tools like SVN."
  },
  {
    term: "Centralized Version Control System (CVCS)",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Beginner",
    definition: "A legacy version control model (such as SVN or CVS) where all commit history resides exclusively on a single central server, requiring continuous network access and introducing a single point of failure.",
    whyItMatters: "Understanding CVCS drawbacks highlights why modern DevOps teams universally migrated to Git.",
    example: "In SVN, developers cannot commit or review branch logs while offline."
  },
  {
    term: "Check-in vs Checkout",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Beginner",
    definition: "Core VCS terms: 'Check-in' refers to uploading/committing code to the version control system; 'Checkout' refers to downloading code from the VCS or switching to a specific branch or historical commit.",
    whyItMatters: "Fundamental vocabulary used across all version control and CI/CD operations.",
    example: "Running `git checkout feature/auth` switches your working tree to the specified branch."
  },
  {
    term: "The Three Sections (Local Architecture)",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Beginner",
    definition: "Git's mental model organizing local files into three stages: Working Directory (untracked/modified files on disk), Staging Area/Index (intermediate snapshot preparation), and Local Repository (committed DAG snapshots in `.git`).",
    whyItMatters: "Mastering the three sections explains how every Git command operates and removes confusion about file states.",
    example: "Files move: Working Directory -> `git add` -> Staging Area -> `git commit` -> Local Repo."
  },
  {
    term: "Unstaging (git rm --cached / git reset)",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Beginner",
    definition: "The safe operation of moving a file back from the Staging Area to the Working Directory without deleting the file or losing edits on disk.",
    whyItMatters: "Prevents accidental commits of credentials, debug logs, or unrelated files without destroying local disk work.",
    example: "`git rm --cached .env` unstages the file while keeping it intact on disk."
  },
  {
    term: "The .git Hidden Directory",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Beginner",
    definition: "A hidden directory created by `git init` at the root of the project that contains configuration, object databases (blobs, trees, commits), refs, and the reflog.",
    whyItMatters: "Deleting this folder permanently destroys all local commit history, branches, and configuration for that repository.",
    example: "Contains `HEAD`, `config`, `objects/`, and `refs/heads/`."
  },
  {
    term: "Git Clean (Dry Run vs Force Clean)",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Intermediate",
    definition: "A command that cleans untracked build artifacts and temporary files from the working directory. The `-n` flag previews what will be deleted (dry run); `-f` executes deletion.",
    whyItMatters: "Critical for workspace hygiene after messy local builds, while avoiding accidental deletion of new source files.",
    example: "`git clean -nd` previews untracked files and directories before running `git clean -fd`."
  },
  {
    term: "Git Reflog",
    category: "git",
    categoryLabel: "Git & GitHub",
    level: "Intermediate",
    definition: "A local tamper-evident chronological ledger recording every movement of HEAD, enabling recovery of deleted branches, lost commits, and botched hard resets.",
    whyItMatters: "The ultimate emergency safety net in Git: almost nothing committed is ever truly lost as long as it exists in the reflog.",
    example: "`git reset --hard HEAD@{2}` rolls back to where HEAD was two operations ago."
  },

  // =========================================================================
  // 3. BUILD TOOLS & CODE QUALITY (MAVEN & SONARQUBE)
  // =========================================================================
  {
    term: "Build Automation Tool",
    category: "build",
    categoryLabel: "Build & Quality",
    level: "Beginner",
    definition: "A software tool (such as Maven, Gradle, or npm) that automates the compilation of human-readable source code into machine-executable binary artifacts (JAR, WAR, binaries), runs automated unit tests, and manages 3rd-party library dependencies.",
    whyItMatters: "Eliminates manual compilation and ensures uniform, reproducible builds across developer machines and CI servers.",
    example: "`mvn clean package` downloads external libraries, compiles Java code, runs JUnit tests, and produces a deployable `.jar` file."
  },
  {
    term: "Artifact",
    category: "build",
    categoryLabel: "Build & Quality",
    level: "Beginner",
    definition: "The compiled, packaged, deployable binary output file generated at the end of a build pipeline (e.g., `.jar`, `.war`, `.tar.gz`, or Docker image) that is ready to be deployed to an environment or stored in a registry.",
    whyItMatters: "Build once, deploy many: the identical artifact tested in staging must be the exact artifact deployed to production.",
    example: "`target/order-service-1.0.0.jar` or a Docker image tagged with a commit SHA."
  },
  {
    term: "Static Application Security Testing (SAST)",
    category: "build",
    categoryLabel: "Build & Quality",
    level: "Intermediate",
    definition: "An automated security testing methodology (exemplified by SonarQube) that analyzes application source code for security vulnerabilities, bugs, and anti-patterns without actually executing the code.",
    whyItMatters: "Shifts security left, catching SQL injections, hardcoded passwords, and memory leaks before code is built.",
    example: "SonarQube flags a warning: 'Hardcoded AWS secret key detected on line 42 of auth.js'."
  },
  {
    term: "Quality Gate",
    category: "build",
    categoryLabel: "Build & Quality",
    level: "Intermediate",
    definition: "A set of strict Boolean threshold conditions defined in code quality platforms (like SonarQube) that an artifact must pass (e.g., 0 Critical Vulnerabilities, >80% Code Coverage) to be allowed to deploy.",
    whyItMatters: "Acts as an automated circuit breaker preventing substandard or dangerous code from entering production.",
    example: "If code coverage drops below 80%, SonarQube fails the Quality Gate, and Jenkins immediately stops the deployment pipeline."
  },

  // =========================================================================
  // 4. CI/CD AUTOMATION & JENKINS
  // =========================================================================
  {
    term: "Continuous Integration (CI)",
    category: "cicd",
    categoryLabel: "CI/CD & Jenkins",
    level: "Beginner",
    definition: "A software development practice where developers frequently merge code changes into a central repository multiple times a day. Each merge automatically triggers an automated build and test sequence to catch bugs early.",
    whyItMatters: "Prevents 'integration hell' and guarantees that code in the main branch is always tested and compilable.",
    example: "Opening a Pull Request triggers Jenkins to run tests and report a green checkmark."
  },
  {
    term: "Continuous Delivery (CD)",
    category: "cicd",
    categoryLabel: "CI/CD & Jenkins",
    level: "Beginner",
    definition: "An extension of Continuous Integration where the application artifact is automatically built, tested, packaged, and staged so that it is always in a releasable state, needing only a single manual click to release to production.",
    whyItMatters: "Reduces release overhead from weeks to minutes while keeping business control over release timing.",
    example: "The pipeline builds and verifies the app, pauses for a manager approval button, then deploys to AWS."
  },
  {
    term: "Continuous Deployment",
    category: "cicd",
    categoryLabel: "CI/CD & Jenkins",
    level: "Intermediate",
    definition: "The ultimate evolution of CI/CD where every single code commit that passes all automated testing and security gates is deployed directly into live production with zero human intervention.",
    whyItMatters: "Elite DevOps teams deploy dozens or hundreds of times per day using Continuous Deployment.",
    example: "A developer merges a bugfix into main; within 7 minutes it is running live for millions of end users."
  },
  {
    term: "Pipeline-as-Code",
    category: "cicd",
    categoryLabel: "CI/CD & Jenkins",
    level: "Beginner",
    definition: "The practice of defining the entire deployment workflow (stages, steps, tests, notifications) in a text file (such as a Jenkinsfile or GitHub Actions YAML) stored directly in source control alongside application code.",
    whyItMatters: "Makes delivery pipelines version-controlled, auditable, and reproducible instead of relying on fragile manual web GUI clicks.",
    example: "Storing a `Jenkinsfile` at the root of your GitHub repository."
  },
  {
    term: "Jenkins Controller (Master) vs Agent (Worker)",
    category: "cicd",
    categoryLabel: "CI/CD & Jenkins",
    level: "Intermediate",
    definition: "The distributed architecture of Jenkins. The Controller schedules jobs, manages plugins, and provides the web GUI. Agents are worker machines (VMs or Docker containers) that actually execute the CPU-heavy build and test commands.",
    whyItMatters: "Never run build workloads on the Controller! Offloading to ephemeral agents guarantees security, scalability, and stability.",
    example: "The Jenkins Controller delegates a Maven build job to a temporary Docker container agent node."
  },
  {
    term: "Job vs Build (Jenkins)",
    category: "cicd",
    categoryLabel: "CI/CD & Jenkins",
    level: "Beginner",
    definition: "Core Jenkins distinction: A 'Job' is the reusable task definition (what tools to run, how to build, and when to trigger); a 'Build' is one specific historical execution run of that job (e.g. Build #1, #2, #3).",
    whyItMatters: "Avoids confusing configuration with execution history.",
    example: "A single job 'build-my-app' has run 142 builds over the past 3 months."
  },
  {
    term: "Jenkins Plugin",
    category: "cicd",
    categoryLabel: "CI/CD & Jenkins",
    level: "Beginner",
    definition: "An independently versioned software extension that integrates external developer tools (Git, Maven, Slack, Docker, AWS) into Jenkins' core automation engine.",
    whyItMatters: "Allows Jenkins core to remain lightweight while connecting to infinite toolchains and cloud providers.",
    example: "The Git plugin checks out repository commits; the Email-ext plugin dispatches failure notifications."
  },
  {
    term: "Security Realm vs Authorization Strategy",
    category: "cicd",
    categoryLabel: "CI/CD & Jenkins",
    level: "Intermediate",
    definition: "The two pillars of Jenkins security configured in Global Security. The Security Realm controls Authentication (how users prove who they are, e.g. Jenkins database or LDAP). Authorization Strategy controls Permissions (what actions each authenticated user or group is allowed to perform).",
    whyItMatters: "Separating authentication from authorization allows integrating corporate SSO while maintaining granular Jenkins permissions.",
    example: "LDAP authenticates the corporate user; Role Strategy restricts them to QA read-only access."
  },
  {
    term: "Role-based Authorization Strategy (Role Strategy Plugin)",
    category: "cicd",
    categoryLabel: "CI/CD & Jenkins",
    level: "Intermediate",
    definition: "The enterprise authorization plugin in Jenkins that replaces the dangerous 'logged-in users can do anything' setting with reusable, named roles (Developer, QA, Admin) scoped with strict least-privilege permissions.",
    whyItMatters: "Prevents accidental or malicious modification of production job configurations and protects sensitive credentials.",
    example: "Assigning QA engineers a role with Job/Read and Job/Build, but hiding Job/Configure and Credentials."
  },
  {
    term: "Freestyle Project vs Pipeline Job",
    category: "cicd",
    categoryLabel: "CI/CD & Jenkins",
    level: "Beginner",
    definition: "The two primary job types in Jenkins. A Freestyle project is configured manually through web forms in the Jenkins UI. A Pipeline job defines the multi-stage delivery process as code in a version-controlled 'Jenkinsfile' in Git.",
    whyItMatters: "Pipelines-as-Code scale across hundreds of repositories and undergo peer code review, unlike manual UI configurations.",
    example: "A Freestyle job is used for quick UI prototyping; production enterprise systems standardize on Declarative Pipelines."
  },
  {
    term: "Build Periodically vs Poll SCM",
    category: "cicd",
    categoryLabel: "CI/CD & Jenkins",
    level: "Intermediate",
    definition: "Two scheduled trigger types using 5-field cron syntax. 'Build periodically' always executes the build on schedule, even if zero code changed. 'Poll SCM' checks the Git repository on schedule and only executes a build if new commits exist.",
    whyItMatters: "Understanding the difference prevents unnecessary compute costs and Git API rate-limiting.",
    example: "`H 2 * * *` (Build periodically for nightly security scans) vs `H/15 * * * *` (Poll SCM for code updates)."
  },
  {
    term: "Selenium WebDriver",
    category: "cicd",
    categoryLabel: "CI/CD & Jenkins",
    level: "Beginner",
    definition: "An open-source browser automation framework used to write and execute programmatic tests against real web applications, driving browsers to click elements, fill forms, and assert expected page behaviors.",
    whyItMatters: "Automates end-to-end user acceptance testing, preventing broken user interfaces from reaching production.",
    example: "`WebDriver driver = new ChromeDriver(); driver.get('https://example.com'); assertEquals('Example Domain', driver.getTitle());`"
  },
  {
    term: "Headless Browser Testing",
    category: "cicd",
    categoryLabel: "CI/CD & Jenkins",
    level: "Intermediate",
    definition: "Running browser automation (Chrome, Firefox) without a graphical user interface or physical monitor. Mandatory for Linux CI/CD servers that operate in headless environments without X11 desktop display servers.",
    whyItMatters: "Enables fast, lightweight browser testing on remote Linux CI build agents and inside Docker containers.",
    example: "Passing `options.addArguments('--headless=new', '--no-sandbox')` to ChromeDriver in CI pipelines."
  },
  {
    term: "Surefire JUnit Test Reports",
    category: "cicd",
    categoryLabel: "CI/CD & Jenkins",
    level: "Intermediate",
    definition: "Standardized XML test result files generated by Maven at `**/target/surefire-reports/*.xml` recording test duration, passed/failed assertions, and failure stack traces, indexed by Jenkins into visual trend charts.",
    whyItMatters: "Provides granular visibility into which specific test cases failed and tracks test pass/fail trends across historical builds.",
    example: "Jenkins parses Surefire XML files via `post { always { junit '**/target/surefire-reports/*.xml' } }`."
  },

  // =========================================================================
  // 5. INFRASTRUCTURE AS CODE & CONFIGURATION (TERRAFORM & ANSIBLE)
  // =========================================================================
  {
    term: "Infrastructure as Code (IaC)",
    category: "iac",
    categoryLabel: "IaC & Terraform",
    level: "Beginner",
    definition: "The practice of managing, provisioning, and configuring computer data centers and cloud resources (servers, VPCs, subnets, firewalls) using machine-readable definition files rather than manual console clicking.",
    whyItMatters: "Enables version-controlled, repeatable, drift-free cloud environments that can be spun up or destroyed in minutes.",
    example: "A 50-line Terraform file creates an identical VPC, subnets, and EC2 instances in both US and Europe."
  },
  {
    term: "Declarative vs Imperative IaC",
    category: "iac",
    categoryLabel: "IaC & Terraform",
    level: "Intermediate",
    definition: "Declarative defines 'WHAT' the desired end-state should be, and the tool calculates how to reach it (Terraform, Kubernetes YAML). Imperative defines 'HOW' step-by-step to execute commands (Bash scripts).",
    whyItMatters: "Declarative is vastly preferred for cloud infrastructure because it automatically handles updates, deletions, and idempotent reconciliation.",
    example: "Declarative: `replicas: 3` (tool ensures 3 exist). Imperative: `create_vm(); create_vm(); create_vm()`."
  },
  {
    term: "Terraform State File (terraform.tfstate)",
    category: "iac",
    categoryLabel: "IaC & Terraform",
    level: "Intermediate",
    definition: "A critical JSON file where Terraform records the real-world IDs, attributes, and mapping of every cloud resource it manages. Terraform compares this state file against your code to determine what to create, modify, or destroy.",
    whyItMatters: "Must be stored in a remote secure backend (like Amazon S3 with DynamoDB state locking) to prevent team race conditions and disaster.",
    example: "Terraform checks `terraform.tfstate` and says: '1 to add, 0 to change, 0 to destroy'."
  },
  {
    term: "Idempotency",
    category: "iac",
    categoryLabel: "IaC & Terraform",
    level: "Intermediate",
    definition: "A property of an operation where applying it multiple times produces the exact same result as applying it once, without making unintended duplicate changes.",
    whyItMatters: "Crucial for automated DevOps scripts; running an Ansible playbook or Terraform apply 10 times will not create 10 duplicate servers if 1 already exists.",
    example: "If an Nginx package is already installed, an idempotent Ansible task checks and skips installation without error."
  },

  // =========================================================================
  // 6. DOCKER & CONTAINERIZATION
  // =========================================================================
  {
    term: "Container",
    category: "docker",
    categoryLabel: "Docker Containers",
    level: "Beginner",
    definition: "A lightweight, standalone, executable package that bundles an application's code, runtime, system tools, libraries, and settings together. It runs as an isolated process on the host operating system kernel.",
    whyItMatters: "Solves the notorious 'It works on my machine!' problem forever by ensuring code runs identically everywhere.",
    example: "Running `docker run -d -p 80:80 nginx:alpine` boots a web server in under 500 milliseconds."
  },
  {
    term: "Container Image",
    category: "docker",
    categoryLabel: "Docker Containers",
    level: "Beginner",
    definition: "A read-only, immutable template with instructions for creating a Docker container. An image is composed of stacked layers representing file modifications.",
    whyItMatters: "The blueprint from which running container instances are spawned.",
    example: "An image is like a class in programming; a container is a running instance of that class."
  },
  {
    term: "Dockerfile",
    category: "docker",
    categoryLabel: "Docker Containers",
    level: "Beginner",
    definition: "A simple plain-text document containing sequential instructions (FROM, COPY, RUN, EXPOSE, CMD) that a developer writes to assemble and build a Docker image.",
    whyItMatters: "The code definition that specifies how your application is packaged and executed.",
    example: "A 10-line text file starting with `FROM node:20-alpine` and ending with `CMD ['node', 'server.js']`."
  },
  {
    term: "Linux Namespaces",
    category: "docker",
    categoryLabel: "Docker Containers",
    level: "Intermediate",
    definition: "A feature of the Linux kernel that isolates system resources so that a group of processes sees a private, isolated instance of that resource (PID namespace for processes, NET for networking, MNT for filesystems).",
    whyItMatters: "The fundamental Linux kernel technology that provides process isolation for containers without needing virtual machines.",
    example: "Inside a container's PID namespace, your application is PID 1, completely blind to host processes."
  },
  {
    term: "Control Groups (cgroups)",
    category: "docker",
    categoryLabel: "Docker Containers",
    level: "Intermediate",
    definition: "A Linux kernel mechanism that meters, limits, and isolates the physical resource usage (CPU cores, memory, disk I/O, network bandwidth) of a collection of processes.",
    whyItMatters: "Prevents a single rogue or leaking container from consuming 100% of host RAM and crashing the server.",
    example: "Specifying `--memory='512m' --cpus='1.0'` instructs cgroups to enforce hard hardware caps."
  },
  {
    term: "Multi-Stage Build",
    category: "docker",
    categoryLabel: "Docker Containers",
    level: "Intermediate",
    definition: "A Dockerfile authoring method that uses multiple `FROM` instructions, allowing you to compile code in a heavy build container and copy ONLY the compiled output into a tiny runtime container, discarding build tools.",
    whyItMatters: "Shrinks production image sizes from 1.5GB down to 50MB and removes attack surfaces (compilers, git, shells).",
    example: "Compiling with `FROM golang:1.22 AS builder` and running with `FROM scratch` or `alpine`."
  },
  {
    term: "dockerd, containerd & runc",
    category: "docker",
    categoryLabel: "Docker Containers",
    level: "Intermediate",
    definition: "The three-tier modular engine executing containers: dockerd provides the high-level REST API, volume, and network logic; containerd is the CNCF supervisor managing image downloads and container lifecycle; runc is the low-level OCI runtime tool that interacts with the Linux kernel to create namespaces and cgroups.",
    whyItMatters: "Decouples container execution so the Docker daemon can be upgraded without killing active running microservice containers.",
    example: "The Docker CLI calls dockerd via Unix socket, which delegates execution via gRPC to containerd, which spawns runc."
  },
  {
    term: "Union File System (OverlayFS)",
    category: "docker",
    categoryLabel: "Docker Containers",
    level: "Intermediate",
    definition: "A Linux storage driver that stacks multiple read-only image layers (lowerdir) and one ephemeral read-write container layer (upperdir) into a single unified merged filesystem view using Copy-on-Write (CoW).",
    whyItMatters: "Enables multiple containers to share the exact same underlying image disk blocks safely without corrupting each other.",
    example: "Modifying /etc/nginx.conf inside a container writes to the ephemeral upperdir, leaving the base nginx:alpine image unchanged."
  },
  {
    term: "CMD vs ENTRYPOINT",
    category: "docker",
    categoryLabel: "Docker Containers",
    level: "Intermediate",
    definition: "Dockerfile instructions defining process execution: ENTRYPOINT defines the fixed executable process (PID 1), while CMD supplies default arguments that can be overridden at runtime via CLI arguments.",
    whyItMatters: "Using the Exec Form (JSON array) ensures PID 1 receives SIGTERM signals directly from 'docker stop' for graceful shutdown.",
    example: "ENTRYPOINT [\"python\", \"app.py\"] with CMD [\"--port=8080\"] allows 'docker run app --port=9090' to override the port."
  },
  {
    term: "User-Defined Bridge Network",
    category: "docker",
    categoryLabel: "Docker Containers",
    level: "Beginner",
    definition: "A private virtual network created via 'docker network create' featuring an embedded Docker DNS resolver at 127.0.0.11 that automatically resolves container names and service aliases to dynamic IP addresses.",
    whyItMatters: "Eliminates hardcoded container IP addresses and provides complete network isolation between microservice tiers.",
    example: "Connecting frontend and api containers to 'app-net' allows the frontend to call http://api:3000 via automatic DNS."
  },
  {
    term: "Docker Storage Volumes vs Bind Mounts",
    category: "docker",
    categoryLabel: "Docker Containers",
    level: "Beginner",
    definition: "Storage mechanisms that persist data outside the container lifecycle: Named Volumes are managed by Docker under /var/lib/docker/volumes/ and bypass the CoW driver for native disk I/O; Bind Mounts map arbitrary host paths directly into the container.",
    whyItMatters: "Stateful databases (PostgreSQL, MySQL) require Named Volumes to prevent total data loss upon container termination.",
    example: "Mounting '-v pgdata:/var/lib/postgresql/data' persists customer database tables across container destruction."
  },
  {
    term: "Docker Compose",
    category: "docker",
    categoryLabel: "Docker Containers",
    level: "Beginner",
    definition: "A declarative orchestration tool and YAML specification (compose.yaml) used to define, configure, and run multi-container applications (frontend, API, database, cache) with shared networks, volumes, and healthchecks in a single command.",
    whyItMatters: "Replaces fragile multi-line shell scripts with version-controlled infrastructure definitions that run identically across dev and staging.",
    example: "Running 'docker compose up -d' launches a coordinated stack of Node.js API, PostgreSQL database, and Redis cache."
  },
  {
    term: "OOMKilled (Exit Code 137)",
    category: "docker",
    categoryLabel: "Docker Containers",
    level: "Advanced",
    definition: "A Linux kernel condition where the Out-Of-Memory Killer abruptly terminates a container process with SIGKILL (128 + 9 = Exit Code 137) because its physical RAM consumption exceeded its allocated cgroup limit.",
    whyItMatters: "The most common production container crash under high traffic; requires tuning container cgroup memory ceilings and runtime heap sizes.",
    example: "A Java JVM container allocated 512MB RAM spikes to 520MB under load, triggering the kernel OOM killer."
  },

  // =========================================================================
  // 7. KUBERNETES & CONTAINER ORCHESTRATION
  // =========================================================================
  {
    term: "Container Orchestrator",
    category: "kubernetes",
    categoryLabel: "Kubernetes (K8s)",
    level: "Beginner",
    definition: "An automated software system (like Kubernetes) that manages the lifecycle of hundreds or thousands of containers across a cluster of servers: automated deployment, scaling, health self-healing, networking, and load balancing.",
    whyItMatters: "Managing 100+ individual Docker containers manually across 20 VMs is impossible without an orchestrator.",
    example: "Kubernetes automatically detects a crashed container on Node 2 and restarts it on Node 4 in seconds."
  },
  {
    term: "Pod",
    category: "kubernetes",
    categoryLabel: "Kubernetes (K8s)",
    level: "Beginner",
    definition: "The smallest deployable computing unit in Kubernetes. A Pod encapsulates one (or a few closely coupled) container(s), shared storage volumes, and a single unique IP address.",
    whyItMatters: "You never deploy raw Docker containers in Kubernetes; you always deploy Pods.",
    example: "A Pod containing an Nginx web container and a lightweight sidecar log-collector container."
  },
  {
    term: "Control Plane (Master Node)",
    category: "kubernetes",
    categoryLabel: "Kubernetes (K8s)",
    level: "Intermediate",
    definition: "The brain of the Kubernetes cluster that makes global decisions (scheduling, detecting failures, maintaining desired state). Components include: kube-apiserver, etcd, kube-scheduler, and kube-controller-manager.",
    whyItMatters: "In managed cloud Kubernetes (Amazon EKS), AWS fully manages and scales the Control Plane for you.",
    example: "When you run `kubectl apply`, you are communicating directly with the `kube-apiserver` in the Control Plane."
  },
  {
    term: "Worker Node (Kubelet & Kube-Proxy)",
    category: "kubernetes",
    categoryLabel: "Kubernetes (K8s)",
    level: "Intermediate",
    definition: "The physical server or virtual machine in a cluster that executes containerized workloads. It runs the Kubelet (node agent that communicates with master), Kube-Proxy (network router), and container runtime (containerd).",
    whyItMatters: "Worker nodes provide the physical CPU and RAM compute pool where your application pods actually run.",
    example: "An Amazon EC2 instance joined to an EKS cluster as an active worker node."
  },
  {
    term: "Deployment",
    category: "kubernetes",
    categoryLabel: "Kubernetes (K8s)",
    level: "Beginner",
    definition: "A declarative Kubernetes controller that manages a replicated set of identical Pods via a ReplicaSet. It automates zero-downtime rolling updates, scaling, and rollbacks.",
    whyItMatters: "The standard workload controller used for stateless microservices and web APIs.",
    example: "`kubectl set image deployment/frontend web=frontend:v2` seamlessly rolls out new pods without downtime."
  },
  {
    term: "Kubernetes Service (ClusterIP, NodePort, LoadBalancer)",
    category: "kubernetes",
    categoryLabel: "Kubernetes (K8s)",
    level: "Beginner",
    definition: "An abstraction that defines a logical set of Pods and a stable network access policy. Pods are ephemeral and their IPs change constantly; a Service provides a single permanent virtual IP and DNS name.",
    whyItMatters: "Prevents broken connections when pods crash, restart, or scale up and down.",
    example: "A frontend pod connects to `http://payment-service:8080`, and the Service distributes traffic across healthy pods."
  },
  {
    term: "Ingress Controller",
    category: "kubernetes",
    categoryLabel: "Kubernetes (K8s)",
    level: "Intermediate",
    definition: "A specialized Layer 7 reverse proxy (e.g. Nginx Ingress or AWS ALB Controller) that manages external user access to cluster services, providing hostname routing, path-based routing, and SSL/TLS termination.",
    whyItMatters: "Saves massive cloud costs by routing hundreds of internal services through a single cloud load balancer.",
    example: "Directing `api.domain.com/orders` to service A and `api.domain.com/users` to service B."
  },
  {
    term: "ConfigMap vs Secret",
    category: "kubernetes",
    categoryLabel: "Kubernetes (K8s)",
    level: "Beginner",
    definition: "ConfigMaps store non-confidential configuration data (ports, URLs, flags) in plain key-value pairs. Secrets store sensitive confidential data (passwords, API tokens, TLS keys) Base64-encoded and encrypted at rest.",
    whyItMatters: "Decouples configuration from application container images, enabling the same image to run in dev, test, and prod.",
    example: "Mounting database connection strings via ConfigMap and database passwords via Kubernetes Secret."
  },
  {
    term: "Helm",
    category: "kubernetes",
    categoryLabel: "Kubernetes (K8s)",
    level: "Intermediate",
    definition: "The package manager for Kubernetes (equivalent to apt for Ubuntu or npm for Node.js). It packages complex multi-manifest applications into reusable 'Helm Charts' with dynamic parameter templates.",
    whyItMatters: "Allows deploying production-grade systems like Prometheus, Redis clusters, or Nginx Ingress with a single command.",
    example: "`helm install my-ingress ingress-nginx/ingress-nginx` deploys complete ingress infrastructure."
  },
  {
    term: "Horizontal Pod Autoscaler (HPA)",
    category: "kubernetes",
    categoryLabel: "Kubernetes (K8s)",
    level: "Intermediate",
    definition: "A Kubernetes controller that automatically scales the number of Pod replicas in a Deployment or ReplicaSet up or down based on observed CPU utilization, memory consumption, or custom application metrics.",
    whyItMatters: "Enables cloud workloads to handle unexpected traffic spikes automatically without manual intervention, while saving costs by scaling down during off-peak hours.",
    example: "`kubectl autoscale deployment api --cpu-percent=70 --min=2 --max=10` maintains average 70% CPU usage."
  },
  {
    term: "PersistentVolume (PV) & PVC",
    category: "kubernetes",
    categoryLabel: "Kubernetes (K8s)",
    level: "Intermediate",
    definition: "A PersistentVolume (PV) is an administrator- or storageclass-provisioned physical storage disk (e.g. AWS EBS, NFS). A PersistentVolumeClaim (PVC) is a developer's request for storage specifying size and access modes (RWO, RWX).",
    whyItMatters: "Decouples application pods from underlying cloud storage infrastructure, ensuring data survives pod restarts and rescheduling.",
    example: "A PostgreSQL StatefulSet mounting a 50Gi AWS EBS volume via a PersistentVolumeClaim."
  },
  {
    term: "StatefulSet vs DaemonSet",
    category: "kubernetes",
    categoryLabel: "Kubernetes (K8s)",
    level: "Advanced",
    definition: "A StatefulSet manages stateful apps requiring ordered deployment, persistent disk bindings, and stable network identifiers (pod-0, pod-1). A DaemonSet ensures that all (or targeted) nodes run exactly one copy of a Pod.",
    whyItMatters: "Stateless Deployments cannot run databases or node monitoring agents properly; StatefulSets and DaemonSets solve both specialized architectural patterns.",
    example: "Running MongoDB with a StatefulSet and running Fluentd log collectors with a DaemonSet."
  },
  {
    term: "kind (Kubernetes in Docker)",
    category: "kubernetes",
    categoryLabel: "Kubernetes (K8s)",
    level: "Beginner",
    definition: "A lightweight open-source tool for running local Kubernetes clusters where each cluster node runs as a Docker container. It supports multi-node cluster topologies and integrates directly with kubectl.",
    whyItMatters: "Allows developers and CI/CD pipelines to bootstrap and destroy complete multi-node Kubernetes clusters in under 60 seconds with zero cloud costs.",
    example: "`kind create cluster --config multi-node.yaml` spins up 1 control plane node and 2 worker nodes locally."
  },

  // =========================================================================
  // 8. AWS CLOUD COMPUTING (ENTERPRISE INFRASTRUCTURE)
  // =========================================================================
  {
    term: "Cloud Computing",
    category: "aws",
    categoryLabel: "AWS Cloud",
    level: "Beginner",
    definition: "The on-demand delivery of IT resources (computing power, storage, databases, networking) over the internet with pay-as-you-go pricing, eliminating upfront capital hardware expenses.",
    whyItMatters: "Enables spinning up a multi-server global infrastructure in 60 seconds with zero physical hardware procurement.",
    example: "Renting an EC2 virtual server for 3 hours and paying only a few cents per hour."
  },
  {
    term: "Region vs Availability Zone (AZ)",
    category: "aws",
    categoryLabel: "AWS Cloud",
    level: "Beginner",
    definition: "A Region is a distinct geographical area around the world (e.g. us-east-1 in Virginia). An Availability Zone is one or more physically isolated, redundant data centers located within that Region connected via low-latency fiber.",
    whyItMatters: "Deploying across multiple AZs provides High Availability (if one data center floods, the other survives).",
    example: "Region `us-east-1` contains 6 distinct Availability Zones (`us-east-1a` through `us-east-1f`)."
  },
  {
    term: "Amazon VPC (Virtual Private Cloud)",
    category: "aws",
    categoryLabel: "AWS Cloud",
    level: "Beginner",
    definition: "A logically isolated virtual network dedicated to your AWS account where you define IP address ranges (CIDR blocks), create subnets, configure route tables, and manage network gateways.",
    whyItMatters: "The secure networking foundation where all enterprise servers, containers, and databases reside.",
    example: "A VPC with CIDR `10.0.0.0/16` providing 65,536 private IP addresses for your corporate cloud."
  },
  {
    term: "Public Subnet vs Private Subnet",
    category: "aws",
    categoryLabel: "AWS Cloud",
    level: "Beginner",
    definition: "A Public Subnet has a direct route table entry to an Internet Gateway (IGW), allowing two-way public internet communication. A Private Subnet has NO direct route to an IGW and requires a NAT Gateway to initiate outbound internet access.",
    whyItMatters: "Security cornerstone: Place load balancers in Public Subnets; place databases and backend microservices in Private Subnets.",
    example: "Web ALB lives in public subnet `10.0.1.0/24`; MySQL database lives in private subnet `10.0.2.0/24`."
  },
  {
    term: "Security Group vs Network ACL (NACL)",
    category: "aws",
    categoryLabel: "AWS Cloud",
    level: "Beginner",
    definition: "A Security Group acts as a Stateful virtual firewall at the EC2 instance/ENI level (return traffic is auto-allowed). A Network ACL is a Stateless subnet-level firewall (rules evaluated separately in both directions).",
    whyItMatters: "Stateful Security Groups are your primary firewall; Stateless NACLs act as a perimeter defense layer.",
    example: "Security Group allows inbound port 443; return response packets are automatically allowed back out."
  },
  {
    term: "IAM Role vs IAM User",
    category: "aws",
    categoryLabel: "AWS Cloud",
    level: "Beginner",
    definition: "An IAM User is an identity for an individual person with long-term credentials (password, access keys). An IAM Role is an identity intended to be assumed dynamically by AWS resources (EC2, Lambda) using temporary short-lived STS tokens.",
    whyItMatters: "Golden security rule: NEVER hardcode access keys on EC2 servers! Attach an IAM Role to the instance instead.",
    example: "An EC2 instance assumes an IAM Role allowing it to read files from an S3 bucket with zero credentials on disk."
  },
  {
    term: "Block Storage (EBS) vs Object Storage (S3)",
    category: "aws",
    categoryLabel: "AWS Cloud",
    level: "Beginner",
    definition: "Block Storage (EBS) attaches to a single virtual server as a formatted local drive (high IOPS, low latency for OS & DB). Object Storage (S3) stores files as flat objects accessible via HTTP APIs from anywhere (virtually infinite scale).",
    whyItMatters: "Use EBS for root boot disks and databases; use S3 for PDFs, videos, backups, and static websites.",
    example: "EBS volume `/dev/xvda` runs your Linux OS; S3 bucket `my-backups` stores database dumps."
  },

  // =========================================================================
  // 9. OBSERVABILITY & MONITORING (PROMETHEUS & GRAFANA)
  // =========================================================================
  {
    term: "The Three Pillars of Observability",
    category: "monitoring",
    categoryLabel: "Observability",
    level: "Beginner",
    definition: "The three telemetry data types required to understand a distributed cloud system: Metrics (numerical measurements over time), Logs (timestamped event text strings), and Distributed Traces (end-to-end request journeys across microservices).",
    whyItMatters: "Essential for debugging production failures in microservices architectures with dozens of moving parts.",
    example: "Metrics alert you that latency spiked; Traces point to the exact database query; Logs reveal the stack trace."
  },
  {
    term: "Prometheus",
    category: "monitoring",
    categoryLabel: "Observability",
    level: "Intermediate",
    definition: "An open-source monitoring and time-series database system that pulls (scrapes) numerical metrics from applications over HTTP at regular intervals and evaluates alerting rules using PromQL query language.",
    whyItMatters: "The industry-standard monitoring engine for Kubernetes clusters and containerized applications.",
    example: "Prometheus scrapes `http://order-service:8080/metrics` every 15 seconds."
  },
  {
    term: "Grafana",
    category: "monitoring",
    categoryLabel: "Observability",
    level: "Beginner",
    definition: "An open-source data visualization and analytics platform that queries databases (Prometheus, CloudWatch, Elasticsearch) and renders beautiful, real-time graphical dashboards with graphs, gauges, and heatmaps.",
    whyItMatters: "Gives engineering and operations teams a single pane of glass to monitor system health and SLA compliance.",
    example: "A Grafana dashboard displaying 99th percentile API latency, active user count, and worker node memory usage."
  }
];
