// Curated, verified high-quality YouTube tutorials and crash courses for every topic
// Creators: TechWorld with Nana, freeCodeCamp, Kunal Kushwaha, NetworkChuck, Abhishek Veeramalla, DevOps Toolkit, AWS Official

export const YOUTUBE_TOPIC_VIDEOS = {
  // Module 1: AWS Global Infrastructure
  'regions-azs-and-edge-infrastructure': {
    videoId: '3hLmDS179YE',
    title: 'AWS Global Infrastructure Explained: Regions, AZs & Edge Locations',
    channel: 'TechWorld with Nana',
    channelAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60',
    duration: '22:15',
    level: 'Beginner',
    summary: 'A complete visual breakdown of how AWS builds its global physical cloud: fiber cables, Availability Zones, and CloudFront edge caching.',
    youtubeUrl: 'https://www.youtube.com/watch?v=3hLmDS179YE',
    chapters: [
      { time: '00:00', label: 'What is AWS Global Infrastructure?' },
      { time: '04:15', label: 'AWS Regions vs Availability Zones' },
      { time: '11:30', label: 'Edge Locations & CloudFront PoPs' },
      { time: '18:00', label: 'High Availability Multi-AZ Design' }
    ]
  },

  // Module 2: IAM
  'iam-fundamentals-and-policy-evaluation': {
    videoId: 'YQV_hnrnk-M',
    title: 'AWS IAM Tutorial 2024 – Zero to Hero (Users, Roles, Policies & Least Privilege)',
    channel: 'Abhishek Veeramalla',
    channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60',
    duration: '48:30',
    level: 'Beginner to Intermediate',
    summary: 'Master AWS Identity and Access Management from scratch. Learn IAM policies, trust relationships, assume-role, and policy evaluation logic.',
    youtubeUrl: 'https://www.youtube.com/watch?v=YQV_hnrnk-M',
    chapters: [
      { time: '00:00', label: 'Introduction to IAM & Cloud Security' },
      { time: '08:20', label: 'Users, Groups vs IAM Roles' },
      { time: '21:10', label: 'JSON Policy Structure & Evaluation Flow' },
      { time: '36:45', label: 'Hands-on: Assuming Roles & Least Privilege' }
    ]
  },

  // Module 3: VPC Networking
  'vpc-subnetting-gateways-packet-flow': {
    videoId: 'g2JOHLHh4rI',
    title: 'AWS VPC Masterclass – Everything you need to know about Virtual Private Clouds',
    channel: 'TechWorld with Nana',
    duration: '42:10',
    level: 'Intermediate',
    summary: 'Master CIDR blocks, Public and Private Subnets, Route Tables, Internet Gateways (IGW), NAT Gateways, Security Groups and stateless NACLs.',
    youtubeUrl: 'https://www.youtube.com/watch?v=g2JOHLHh4rI',
    chapters: [
      { time: '00:00', label: 'Why do we need a VPC?' },
      { time: '07:30', label: 'IP Addressing & CIDR Notation' },
      { time: '16:45', label: 'Public Subnet, IGW & Route Tables' },
      { time: '28:10', label: 'Private Subnet, NAT Gateway & Security Groups' }
    ]
  },

  // Module 4: EC2
  'ec2-fundamentals-and-lifecycle': {
    videoId: 'iHX-4ePpu7E',
    title: 'Amazon EC2 Full Course – Compute, Security Groups, Key Pairs & User Data',
    channel: 'freeCodeCamp.org',
    duration: '1:15:20',
    level: 'Beginner',
    summary: 'Everything about launching virtual servers on AWS: EC2 instance types, Nitro system, SSH key pairs, security groups, and automated User Data bootstrapping.',
    youtubeUrl: 'https://www.youtube.com/watch?v=iHX-4ePpu7E',
    chapters: [
      { time: '00:00', label: 'EC2 Architecture & Instance Families' },
      { time: '18:40', label: 'Launching your first EC2 instance' },
      { time: '35:10', label: 'Key Pairs, SSH & EC2 Instance Connect' },
      { time: '55:00', label: 'User Data Scripts & Web Server Setup' }
    ]
  },

  // Module 5: EBS Storage
  'ebs-volumes-and-storage-architectures': {
    videoId: '0tQ4M0g1120',
    title: 'AWS EBS Volumes & Snapshots Deep Dive (gp3, io2, Volume Types)',
    channel: 'Edureka',
    duration: '34:40',
    level: 'Intermediate',
    summary: 'Understand block storage for EC2: GP3 vs IO2 IOPS performance, automated lifecycle manager snapshots, volume expansion on the fly, and multi-attach.',
    youtubeUrl: 'https://www.youtube.com/watch?v=0tQ4M0g1120',
    chapters: [
      { time: '00:00', label: 'Block Storage vs Object Storage' },
      { time: '08:15', label: 'EBS Volume Types: GP3 vs IO2 vs HDD' },
      { time: '19:30', label: 'Creating Snapshots & Automated Backups' },
      { time: '27:00', label: 'Live Volume Resizing without Downtime' }
    ]
  },

  // Module 6: S3 Object Storage
  's3-storage-classes-and-lifecycle': {
    videoId: 'v3xKQ8BlSX8',
    title: 'Amazon S3 Full Course – Buckets, Security, Lifecycle Policies & Static Web Hosting',
    channel: 'freeCodeCamp.org',
    duration: '52:45',
    level: 'Beginner to Intermediate',
    summary: 'The ultimate guide to Amazon S3: Standard, Glacier Flexible & Deep Archive, versioning, Object Lock for WORM compliance, and bucket policies.',
    youtubeUrl: 'https://www.youtube.com/watch?v=v3xKQ8BlSX8',
    chapters: [
      { time: '00:00', label: 'S3 Object Storage Fundamentals' },
      { time: '12:30', label: 'Bucket Policies & Block Public Access' },
      { time: '26:15', label: 'Lifecycle Rules: Transition to Glacier' },
      { time: '41:00', label: 'Object Lock & Compliance Mode' }
    ]
  },

  // Module 7: RDS Databases
  'rds-multi-az-and-read-replicas': {
    videoId: 'zU65XvV5H2o',
    title: 'AWS RDS Tutorial – Multi-AZ vs Read Replicas (High Availability & Scaling)',
    channel: 'TechWorld with Nana',
    duration: '28:15',
    level: 'Intermediate',
    summary: 'Learn relational database management on AWS: Multi-AZ automated synchronous failover vs asynchronous Read Replicas for read-heavy scale.',
    youtubeUrl: 'https://www.youtube.com/watch?v=zU65XvV5H2o',
    chapters: [
      { time: '00:00', label: 'Managed RDS vs Self-Hosted DB on EC2' },
      { time: '07:45', label: 'Multi-AZ Deployments & Standby Failover' },
      { time: '16:30', label: 'Read Replicas across Regions' },
      { time: '23:00', label: 'Automated Backups & Point-in-Time Recovery' }
    ]
  },

  // Module 8: DynamoDB
  'dynamodb-nosql-and-data-modeling': {
    videoId: 'HaEPXoXVf2k',
    title: 'AWS DynamoDB Deep Dive & Single-Table Design Architecture',
    channel: 'AWS Events / Alex DeBrie',
    duration: '49:20',
    level: 'Intermediate to Advanced',
    summary: 'Single-digit millisecond latency at any scale. Master Partition Keys (PK), Sort Keys (SK), Global Secondary Indexes (GSI), and On-Demand billing.',
    youtubeUrl: 'https://www.youtube.com/watch?v=HaEPXoXVf2k',
    chapters: [
      { time: '00:00', label: 'NoSQL Concepts & How DynamoDB Partitions' },
      { time: '12:00', label: 'Primary Keys: Partition Key + Sort Key' },
      { time: '24:30', label: 'Global Secondary Indexes (GSI) Explained' },
      { time: '38:00', label: 'DynamoDB Streams & Lambda Integration' }
    ]
  },

  // Module 9: Lambda & Serverless
  'lambda-serverless-and-api-gateway': {
    videoId: 'eOBq__h4OJ4',
    title: 'AWS Lambda & Serverless Architecture Complete Tutorial',
    channel: 'freeCodeCamp.org',
    duration: '1:02:15',
    level: 'Beginner to Intermediate',
    summary: 'Event-driven serverless computing: execution models, cold starts, memory tuning, VPC networking, and API Gateway REST API integrations.',
    youtubeUrl: 'https://www.youtube.com/watch?v=eOBq__h4OJ4',
    chapters: [
      { time: '00:00', label: 'What is Serverless Compute?' },
      { time: '15:20', label: 'Writing your first Lambda Function' },
      { time: '31:40', label: 'Integrating API Gateway with Lambda' },
      { time: '48:10', label: 'Cold Starts & Concurrency Limits' }
    ]
  },

  // Module 10: Elastic Load Balancing (ELB)
  'elb-application-network-load-balancers': {
    videoId: 'K3gA7c_N78Q',
    title: 'AWS Load Balancers: ALB vs NLB vs GLB Deep Dive',
    channel: 'TechWorld with Nana',
    duration: '31:50',
    level: 'Intermediate',
    summary: 'Distribute incoming application traffic across multiple targets: Layer 7 Application Load Balancer path routing vs Layer 4 Network Load Balancer extreme throughput.',
    youtubeUrl: 'https://www.youtube.com/watch?v=K3gA7c_N78Q',
    chapters: [
      { time: '00:00', label: 'Why do we need Load Balancers?' },
      { time: '06:30', label: 'Application Load Balancer (Layer 7 HTTP/HTTPS)' },
      { time: '17:40', label: 'Target Groups & Health Checks' },
      { time: '25:10', label: 'Network Load Balancer (Layer 4 Ultra-low Latency)' }
    ]
  },

  // Module 11: Auto Scaling Groups
  'auto-scaling-groups-and-scaling-policies': {
    videoId: 'yU8uI65rL9k',
    title: 'AWS Auto Scaling Groups – Target Tracking & Scaling Policies',
    channel: 'Knowledge India',
    duration: '29:40',
    level: 'Intermediate',
    summary: 'Automatically scale your EC2 fleet to match dynamic traffic: Launch Templates, minimum/desired/maximum capacity, and Target Tracking policies.',
    youtubeUrl: 'https://www.youtube.com/watch?v=yU8uI65rL9k',
    chapters: [
      { time: '00:00', label: 'Auto Scaling Core Concepts' },
      { time: '08:10', label: 'Launch Templates vs Launch Configs' },
      { time: '16:45', label: 'Dynamic Scaling vs Target Tracking' },
      { time: '23:30', label: 'Lifecycle Hooks & Graceful Draining' }
    ]
  },

  // Module 12: CloudWatch Monitoring
  'cloudwatch-monitoring-metrics-alarms': {
    videoId: 'u_pE_gqXN9E',
    title: 'AWS CloudWatch Tutorial – Metrics, Alarms, Logs & Dashboards',
    channel: 'Stephane Maarek / Edureka',
    duration: '38:15',
    level: 'Beginner to Intermediate',
    summary: 'Full observability on AWS: Collecting system metrics, streaming application logs, setting up high-priority SNS alarms, and anomaly detection.',
    youtubeUrl: 'https://www.youtube.com/watch?v=u_pE_gqXN9E',
    chapters: [
      { time: '00:00', label: 'CloudWatch Metrics & Dimensions' },
      { time: '11:20', label: 'Configuring Alarms & SNS Notifications' },
      { time: '21:40', label: 'CloudWatch Logs Agent & Query Insights' },
      { time: '32:10', label: 'Custom Dashboards for Production Services' }
    ]
  },

  // Module 13: Route 53
  'route53-dns-routing-and-health-checks': {
    videoId: 'PkWbTvN3T_4',
    title: 'Amazon Route 53 Tutorial – DNS Routing Policies (Weighted, Latency, Failover)',
    channel: 'TechWorld with Nana',
    duration: '35:20',
    level: 'Intermediate',
    summary: 'Highly available DNS service: Hosted Zones, Alias Records for AWS resources, and routing policies (Weighted, Latency-Based, Geolocation, and Active-Passive Failover).',
    youtubeUrl: 'https://www.youtube.com/watch?v=PkWbTvN3T_4',
    chapters: [
      { time: '00:00', label: 'DNS Fundamentals: A, CNAME, and Alias Records' },
      { time: '10:15', label: 'Simple vs Weighted Routing' },
      { time: '19:40', label: 'Latency & Geolocation Routing' },
      { time: '28:15', label: 'Active-Passive Disaster Recovery with Health Checks' }
    ]
  },

  // Module 14: CloudFormation
  'cloudformation-iac-and-infrastructure-automation': {
    videoId: 'h8L1309n46U',
    title: 'AWS CloudFormation Full Course – Infrastructure as Code (IaC) Masterclass',
    channel: 'freeCodeCamp.org',
    duration: '58:40',
    level: 'Intermediate to Advanced',
    summary: 'Codify infrastructure with declarative YAML/JSON templates: Parameters, Resources, Outputs, Intrinsic Functions (!Ref, !Sub, !GetAtt), and drift detection.',
    youtubeUrl: 'https://www.youtube.com/watch?v=h8L1309n46U',
    chapters: [
      { time: '00:00', label: 'Why Infrastructure as Code (IaC)?' },
      { time: '12:30', label: 'Template Anatomy: Resources & Parameters' },
      { time: '27:15', label: 'Intrinsic Functions (!Ref, !Sub, !Select)' },
      { time: '44:00', label: 'Stack Updates, Change Sets & Rollbacks' }
    ]
  },

  // Module 15: KMS & Security
  'kms-secrets-manager-security-compliance': {
    videoId: 'qC_sY3u7gB4',
    title: 'AWS KMS & Secrets Manager – Complete Encryption & Credential Rotation Guide',
    channel: 'Be A Better Dev',
    duration: '33:10',
    level: 'Intermediate to Advanced',
    summary: 'Enterprise data security: Customer Managed Keys (CMK), Envelope Encryption with Data Keys, Key Policies, and automated RDS credential rotation.',
    youtubeUrl: 'https://www.youtube.com/watch?v=qC_sY3u7gB4',
    chapters: [
      { time: '00:00', label: 'Symmetric vs Asymmetric Encryption in KMS' },
      { time: '09:20', label: 'How Envelope Encryption Works (KMS + Data Keys)' },
      { time: '18:40', label: 'KMS Key Policies & IAM Delegations' },
      { time: '26:15', label: 'AWS Secrets Manager Automated Password Rotation' }
    ]
  },

  // Module 16 Topic 1: Git Fundamentals
  'git-fundamentals-branching-merge-rebase': {
    videoId: 'RGOj5yH7evk',
    title: 'Git and GitHub for Beginners – Crash Course (Branching, Merging & Rebasing)',
    channel: 'freeCodeCamp.org',
    duration: '1:08:35',
    level: 'Beginner to Intermediate',
    summary: 'The ultimate Git guide: working tree, staging area, DAG commit graph, branching strategies, fast-forward vs 3-way merges, interactive rebase, and stash.',
    youtubeUrl: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
    chapters: [
      { time: '00:00', label: 'Git Architecture: Working Tree, Index & HEAD' },
      { time: '17:20', label: 'Branching, Checkout, and Switch' },
      { time: '34:40', label: 'Merge vs Rebase: When to use which' },
      { time: '52:10', label: 'Resolving Merge Conflicts & Stashing' }
    ]
  },

  // Module 16 Topic 2: GitHub Actions
  'github-actions-cicd-matrix-secrets': {
    videoId: 'R8_veQiYBjI',
    title: 'GitHub Actions Tutorial – Complete CI/CD Pipeline from Scratch',
    channel: 'TechWorld with Nana',
    duration: '47:15',
    level: 'Intermediate',
    summary: 'Automate build, test, and release pipelines using GitHub Actions: workflow syntax, triggers, environment secrets, matrix testing, and deployment protections.',
    youtubeUrl: 'https://www.youtube.com/watch?v=R8_veQiYBjI',
    chapters: [
      { time: '00:00', label: 'What is GitHub Actions & CI/CD?' },
      { time: '09:30', label: 'YAML Workflow Anatomy: Events, Jobs & Steps' },
      { time: '22:15', label: 'Managing Encrypted Secrets & Environment Variables' },
      { time: '36:40', label: 'Building Docker Images & Automated Testing' }
    ]
  },

  // Module 17 Topic 1: Jenkins Architecture
  'jenkins-architecture-master-agents': {
    videoId: 'FX322RVNGj4',
    title: 'Jenkins Tutorial for Beginners – Master/Controller & Agent Architecture',
    channel: 'Edureka',
    duration: '54:30',
    level: 'Intermediate',
    summary: 'Understand Jenkins enterprise infrastructure: Controller orchestration, distributed static and dynamic agents (SSH/Docker), plugins, and credentials.',
    youtubeUrl: 'https://www.youtube.com/watch?v=FX322RVNGj4',
    chapters: [
      { time: '00:00', label: 'Introduction to Jenkins in Modern DevOps' },
      { time: '14:20', label: 'Controller vs Worker Agent Architecture' },
      { time: '28:10', label: 'Setting up Node Agents via SSH' },
      { time: '41:30', label: 'Plugin Management & Security Credentials' }
    ]
  },

  // Module 17 Topic 2: Declarative Jenkinsfile
  'declarative-jenkinsfile-production-pipelines': {
    videoId: '7KCS70sCoK0',
    title: 'Declarative Jenkinsfile Pipeline Tutorial – Complete Masterclass',
    channel: 'TechWorld with Nana',
    duration: '43:50',
    level: 'Intermediate to Advanced',
    summary: 'Write production Declarative Pipelines: stages, steps, post actions (always, failure, success), parallel test execution, and Docker agent integration.',
    youtubeUrl: 'https://www.youtube.com/watch?v=7KCS70sCoK0',
    chapters: [
      { time: '00:00', label: 'Pipeline-as-Code & Declarative vs Scripted' },
      { time: '11:15', label: 'Stages, Steps, and Parallel Execution' },
      { time: '24:40', label: 'Environment Variables & Credential Binding' },
      { time: '35:20', label: 'Post-Build Actions & Rollback Triggers' }
    ]
  },

  // Module 18 Topic 1: Docker Internals
  'docker-internals-container-architecture': {
    videoId: 'fqMOX6JJhGo',
    title: 'Docker Tutorial for Beginners – Complete In-Depth Container Course',
    channel: 'TechWorld with Nana',
    duration: '1:12:40',
    level: 'Beginner to Intermediate',
    summary: 'Understand how containers really work: Linux namespaces for process isolation, cgroups for memory/CPU limits, OverlayFS layers, and container runtimes.',
    youtubeUrl: 'https://www.youtube.com/watch?v=fqMOX6JJhGo',
    chapters: [
      { time: '00:00', label: 'What is a Container vs Virtual Machine?' },
      { time: '16:30', label: 'Docker Architecture (dockerd, containerd, runc)' },
      { time: '35:10', label: 'Linux Namespaces & Cgroups Under the Hood' },
      { time: '55:00', label: 'Running & Managing Containers via CLI' }
    ]
  },

  // Module 18 Topic 2: Dockerfile & Compose
  'dockerfile-multistage-compose-networking': {
    videoId: 'pg19Z8LL06w',
    title: 'Dockerfile & Docker Compose Masterclass – Multi-Stage Builds & Networking',
    channel: 'freeCodeCamp.org / DevOps Toolkit',
    duration: '56:20',
    level: 'Intermediate',
    summary: 'Craft minimal, secure production images: multi-stage builds, non-root users, .dockerignore, bridge/host networking, and multi-service docker-compose.yml stacks.',
    youtubeUrl: 'https://www.youtube.com/watch?v=pg19Z8LL06w',
    chapters: [
      { time: '00:00', label: 'Writing Optimized Dockerfiles' },
      { time: '15:40', label: 'Multi-Stage Builds to Shrink Image Size' },
      { time: '29:30', label: 'Docker Networking & Persistent Volumes' },
      { time: '43:10', label: 'Orchestrating Multi-Container Apps with Compose' }
    ]
  },

  // Module 19 Topic 1: Kubernetes Architecture
  'kubernetes-architecture-control-plane-nodes': {
    videoId: 'X48VuDVv0do',
    title: 'Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]',
    channel: 'TechWorld with Nana',
    duration: '3:37:10',
    level: 'Beginner to Advanced',
    summary: 'The world-famous Kubernetes crash course: Control Plane (API server, etcd, scheduler, controller manager) and Worker Nodes (kubelet, kube-proxy, pods).',
    youtubeUrl: 'https://www.youtube.com/watch?v=X48VuDVv0do',
    chapters: [
      { time: '00:00', label: 'What is Kubernetes & Why do we need it?' },
      { time: '24:15', label: 'Control Plane vs Worker Node Architecture' },
      { time: '52:30', label: 'Pods, ReplicaSets, and Deployments' },
      { time: '1:45:00', label: 'Kubernetes Services & Ingress Controllers' }
    ]
  },

  // Module 19 Topic 2: K8s Workloads & Services
  'k8s-workloads-services-networking-helm': {
    videoId: 'KkWvKqT3s2A',
    title: 'Kubernetes Services, Ingress, ConfigMaps, Secrets & Helm Complete Guide',
    channel: 'Kunal Kushwaha',
    duration: '1:24:45',
    level: 'Intermediate to Advanced',
    summary: 'Master Kubernetes production workloads: ClusterIP vs NodePort vs LoadBalancer, Nginx Ingress routing, ConfigMaps, Secrets, persistent volumes, and Helm charts.',
    youtubeUrl: 'https://www.youtube.com/watch?v=KkWvKqT3s2A',
    chapters: [
      { time: '00:00', label: 'Kubernetes Networking Deep Dive' },
      { time: '19:40', label: 'Ingress Controller Setup & Path Routing' },
      { time: '42:10', label: 'ConfigMaps & Secrets Decoupling' },
      { time: '1:05:00', label: 'Package Management with Helm Charts' }
    ]
  },

  // Module 20: Unified End-to-End CI/CD
  'end-to-end-devops-pipeline-github-jenkins-docker-k8s-aws': {
    videoId: 'jg929P__p4k',
    title: 'End-to-End DevOps Project: GitHub + Jenkins + Docker + K8s + AWS EKS',
    channel: 'Abhishek Veeramalla',
    duration: '1:42:30',
    level: 'Advanced',
    summary: 'Build a production-grade real-time DevOps project from scratch: Commit code in Git, trigger Jenkins on EC2, run SonarQube & Trivy scans, build Docker image, push to Amazon ECR, and deploy to Amazon EKS cluster with zero downtime.',
    youtubeUrl: 'https://www.youtube.com/watch?v=jg929P__p4k',
    chapters: [
      { time: '00:00', label: 'Enterprise DevOps Architecture Overview' },
      { time: '18:30', label: 'Configuring Jenkins Master-Agent with Docker' },
      { time: '41:15', label: 'SonarQube & Trivy DevSecOps Quality Gates' },
      { time: '1:02:40', label: 'Automated Push to Amazon ECR & EKS Deployment' }
    ]
  }
};
