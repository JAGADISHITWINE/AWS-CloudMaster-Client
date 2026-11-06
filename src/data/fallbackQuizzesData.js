export const FALLBACK_QUIZZES = [
  {
    "id": "quiz-0",
    "moduleNumber": 1,
    "topicNumber": 3,
    "topicSlug": "regions-azs-and-edge-infrastructure",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "AWS Region vs Availability Zone Mapping",
    "prompt": "Which statement accurately describes how Availability Zone identifiers work across different AWS accounts?",
    "explanation": "To prevent all AWS customers from overloading the first AZ in a region (e.g. us-east-1a), AWS coordinates physical data centers with immutable AZ IDs (e.g., use1-az1) and randomly maps letter identifiers (us-east-1a, us-east-1b) per account.",
    "hintsJson": "[\"Think about why AWS wouldn't want everyone's default 'us-east-1a' pointing to the exact same physical building.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "us-east-1a is physically identical in every single AWS account worldwide.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "AWS randomly maps Availability Zone letter names (e.g. us-east-1a) to physical data center AZ IDs (e.g. use1-az1) across accounts to distribute load.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "An Availability Zone always consists of exactly one single physical server rack.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Regions are connected via the public internet rather than private fiber.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think about why AWS wouldn't want everyone's default 'us-east-1a' pointing to the exact same physical building."
    ]
  },
  {
    "id": "quiz-1",
    "moduleNumber": 2,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "IAM Role Credentials Mechanism",
    "prompt": "How does an EC2 instance securely obtain temporary credentials when an IAM Role is attached via an Instance Profile?",
    "explanation": "The EC2 instance queries the local link-local Instance Metadata Service (IMDS at 169.254.169.254), which uses AWS Security Token Service (STS) to automatically deliver and rotate short-lived security credentials.",
    "hintsJson": "[\"Look into the Instance Metadata Service IP address (169.254.169.254).\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "The IAM root password is saved in a plaintext configuration file on the instance boot disk.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "The instance calls the local Instance Metadata Service (IMDS) at 169.254.169.254, which returns short-lived rotated STS tokens.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "AWS sends credentials to the instance via an unencrypted inbound public SSH port.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "An administrator must manually SSH into the instance every hour to enter new API keys.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Look into the Instance Metadata Service IP address (169.254.169.254)."
    ]
  },
  {
    "id": "quiz-2",
    "moduleNumber": 3,
    "topicNumber": 2,
    "topicSlug": "vpc-security-groups-nacls-firewall-flow-logs",
    "type": "TRUE_FALSE",
    "difficulty": "Intermediate",
    "title": "Security Group Return Traffic Statefulness",
    "prompt": "True or False: If an inbound rule in an AWS Security Group permits TCP port 443 from 0.0.0.0/0, you MUST also add an explicit outbound rule to allow the response packets to return to the client.",
    "explanation": "FALSE. AWS Security Groups are STATEFUL. Return traffic is automatically allowed out regardless of outbound rules. Network ACLs (NACLs), by contrast, are stateless and would require explicit outbound return rules.",
    "hintsJson": "[\"Remember: Security Groups are STATEFUL, whereas NACLs are STATELESS.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "True",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "False",
        "isCorrect": true
      }
    ],
    "hints": [
      "Remember: Security Groups are STATEFUL, whereas NACLs are STATELESS."
    ]
  },
  {
    "id": "quiz-3",
    "moduleNumber": 3,
    "topicNumber": 3,
    "topicSlug": "vpc-peering-transit-gateway-endpoints-vpn",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Free Tier VPC Cost Safety",
    "prompt": "You are setting up an isolated two-tier web application VPC on an AWS Free Tier account. Which of the following networking components incurs an unavoidable hourly fee of ~$0.045/hour (~$32/month) even if your account is within its first 12 months?",
    "explanation": "NAT Gateways are NOT included in the AWS Free Tier and bill ~$0.045/hour plus data processing fees. Internet Gateways, Route Tables, and Security Groups are free.",
    "hintsJson": "[\"Which component provides outbound internet translation for private subnets?\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Internet Gateway (IGW)",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "NAT Gateway",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "VPC Route Table",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Security Group",
        "isCorrect": false
      }
    ],
    "hints": [
      "Which component provides outbound internet translation for private subnets?"
    ]
  },
  {
    "id": "quiz-4",
    "moduleNumber": 4,
    "type": "CLI_OUTPUT",
    "difficulty": "Beginner",
    "title": "EC2 User Data Bootstrapping",
    "prompt": "When does the bash script provided in the EC2 'User Data' field execute by default?",
    "explanation": "By default in cloud-init on Amazon Linux and Ubuntu, User Data scripts execute once only during the very first boot cycle of the instance launch.",
    "hintsJson": "[\"Does it run every time you reboot the server or only at initial provisioning?\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Every single time the instance is stopped and started.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Only once, on the very first boot cycle when the instance is launched.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Every 24 hours as a scheduled cron job.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Only when an administrator connects via SSH.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Does it run every time you reboot the server or only at initial provisioning?"
    ]
  },
  {
    "id": "quiz-5",
    "moduleNumber": 5,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "ELB Listener Routing Capability",
    "prompt": "You need to route HTTP requests destined for 'example.com/api/*' to a microservices fleet and 'example.com/images/*' to an image-processing cluster. Which AWS Load Balancer type should you deploy?",
    "explanation": "Application Load Balancer (ALB) operates at Layer 7 (Application Layer) and natively supports path-based and host-based routing rules.",
    "hintsJson": "[\"Layer 7 operates on HTTP paths like /api and /images.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Network Load Balancer (NLB)",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Application Load Balancer (ALB)",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Gateway Load Balancer (GWLB)",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Classic Load Balancer (CLB)",
        "isCorrect": false
      }
    ],
    "hints": [
      "Layer 7 operates on HTTP paths like /api and /images."
    ]
  },
  {
    "id": "quiz-6",
    "moduleNumber": 6,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "S3 Lowest Cost Storage Tier",
    "prompt": "Which Amazon S3 storage class offers the lowest per-gigabyte monthly storage cost for compliance data that is accessed rarely (once a year or less) and can tolerate retrieval times of 12 hours?",
    "explanation": "S3 Glacier Deep Archive is the lowest-cost storage class in the entire cloud (~$0.00099 per GB/month) with standard retrieval times of 12 hours.",
    "hintsJson": "[\"Look for the storage class with 'Deep Archive' in its name.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "S3 Standard",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "S3 One Zone-IA",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "S3 Glacier Instant Retrieval",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "S3 Glacier Deep Archive",
        "isCorrect": true
      }
    ],
    "hints": [
      "Look for the storage class with 'Deep Archive' in its name."
    ]
  },
  {
    "id": "quiz-7",
    "moduleNumber": 7,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "EBS vs EFS Architectural Difference",
    "prompt": "You have a cluster of 15 web application servers running on EC2 that all require read and write access to a shared POSIX file directory containing user-uploaded profile pictures. Which storage service should you select?",
    "explanation": "Amazon Elastic File System (EFS) provides a fully managed shared file system (NFS) that can be mounted simultaneously across hundreds of EC2 instances and containers across multiple Availability Zones. Standard EBS volumes can only attach to one instance in a single AZ at a time.",
    "hintsJson": "[\"Think about which service supports multi-instance concurrent file sharing over NFS.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Amazon EBS gp3 Volume",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Amazon EFS (Elastic File System)",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "EC2 Instance Store",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "AWS Snowball",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think about which service supports multi-instance concurrent file sharing over NFS."
    ]
  },
  {
    "id": "quiz-8",
    "moduleNumber": 8,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Amazon DynamoDB Perpetual Free Tier",
    "prompt": "What is the perpetual (always free) monthly allowance included for Amazon DynamoDB on every AWS account?",
    "explanation": "Amazon DynamoDB provides a perpetual Free Tier of 25 GB of storage along with 25 Provisioned Write Capacity Units (WCU) and 25 Provisioned Read Capacity Units (RCU) that never expire after 12 months.",
    "hintsJson": "[\"It includes 25 GB of storage and 25 capacity units.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "1 GB storage for 1 month only",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "25 GB storage and 25 WCU / 25 RCU perpetually every month",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "DynamoDB is never free; it charges per second from day 1",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "100 TB storage for 12 months",
        "isCorrect": false
      }
    ],
    "hints": [
      "It includes 25 GB of storage and 25 capacity units."
    ]
  },
  {
    "id": "quiz-9",
    "moduleNumber": 9,
    "type": "TRUE_FALSE",
    "difficulty": "Intermediate",
    "title": "Querying RDS Multi-AZ Standby DB",
    "prompt": "True or False: In an Amazon RDS Multi-AZ deployment, you can configure your analytical reporting tool to query the standby database directly to offload read traffic from the primary instance.",
    "explanation": "FALSE. The Multi-AZ standby replica is PASSIVE and completely inaccessible for user queries. To offload read traffic, you must create an asynchronous Read Replica, which provides a dedicated read endpoint.",
    "hintsJson": "[\"Remember: Standby is passive; Read Replicas are for queries.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "True",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "False",
        "isCorrect": true
      }
    ],
    "hints": [
      "Remember: Standby is passive; Read Replicas are for queries."
    ]
  },
  {
    "id": "quiz-10",
    "moduleNumber": 10,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "AWS Lambda Maximum Execution Ceiling",
    "prompt": "What is the maximum hard timeout limit for a single execution of an AWS Lambda function?",
    "explanation": "AWS Lambda functions can execute for a maximum of 15 minutes (900 seconds). For tasks exceeding 15 minutes, architectures should use AWS Step Functions, ECS tasks, or AWS Batch.",
    "hintsJson": "[\"It is exactly 15 minutes (900 seconds).\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "60 seconds",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "5 minutes",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "15 minutes",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "Unlimited",
        "isCorrect": false
      }
    ],
    "hints": [
      "It is exactly 15 minutes (900 seconds)."
    ]
  },
  {
    "id": "quiz-11",
    "moduleNumber": 11,
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "AWS Fargate Serverless Compute",
    "prompt": "What is the main operational benefit of using AWS Fargate with Amazon ECS or Amazon EKS?",
    "explanation": "AWS Fargate is a serverless compute engine for containers. It eliminates the need to provision, configure, patch, scale, or manage the underlying EC2 virtual machine cluster.",
    "hintsJson": "[\"Focus on what you no longer have to manage (EC2 instances).\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It provides free unlimited GPU instances.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "It runs containers without requiring you to provision, configure, or manage underlying EC2 worker instances.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "It automatically rewrites monolithic PHP code into Go microservices.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It bypasses all AWS IAM permission requirements.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Focus on what you no longer have to manage (EC2 instances)."
    ]
  },
  {
    "id": "quiz-12",
    "moduleNumber": 12,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "CloudTrail vs CloudWatch Responsibility",
    "prompt": "An engineer wants to find out which IAM user deleted an EC2 instance yesterday at 3:15 PM. Which AWS service contains this specific audit record?",
    "explanation": "AWS CloudTrail records account-level management and API activity, capturing the identity of the caller, the API action (e.g. TerminateInstances), and timestamp. CloudWatch monitors resource performance metrics.",
    "hintsJson": "[\"Which service audits API calls and who did what?\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "AWS CloudWatch Metrics",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "AWS CloudTrail",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "AWS Trusted Advisor",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Amazon Inspector",
        "isCorrect": false
      }
    ],
    "hints": [
      "Which service audits API calls and who did what?"
    ]
  },
  {
    "id": "quiz-13",
    "moduleNumber": 13,
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "AWS WAF Protection Layer",
    "prompt": "At which layer of the OSI model does AWS WAF inspect traffic, and against which common attacks does it defend?",
    "explanation": "AWS WAF operates at Layer 7 (Application Layer) and protects against HTTP/HTTPS exploits like SQL Injection (SQLi) and Cross-Site Scripting (XSS).",
    "hintsJson": "[\"WAF protects HTTP/HTTPS traffic at Layer 7.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Layer 3/4 network packet attacks like SYN floods only.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Layer 7 web application attacks like SQL Injection and Cross-Site Scripting (XSS).",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Physical server room intrusions.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "BGP route poisoning.",
        "isCorrect": false
      }
    ],
    "hints": [
      "WAF protects HTTP/HTTPS traffic at Layer 7."
    ]
  },
  {
    "id": "quiz-14",
    "moduleNumber": 14,
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Blue/Green Deployment Strategy Benefits",
    "prompt": "What is the primary architectural advantage of a Blue/Green deployment over a Rolling In-Place deployment?",
    "explanation": "Blue/Green maintains two separate, identical environments. Deploying to the inactive environment allows thorough testing, near-instant cutover via DNS/load balancer, and immediate zero-downtime rollback if a bug is discovered.",
    "hintsJson": "[\"Think about instant traffic cutover and instant rollback capability.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It uses half as much memory as other deployment types.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "It allows testing on the new green environment and enables instant traffic switch with zero-downtime rollback.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "It requires no automated testing.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It eliminates the need for any load balancer.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think about instant traffic cutover and instant rollback capability."
    ]
  },
  {
    "id": "quiz-15",
    "moduleNumber": 15,
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "AWS Well-Architected Reliability Principle",
    "prompt": "According to the AWS Well-Architected Framework Reliability Pillar, what is the core architectural tenet regarding failure?",
    "explanation": "The core tenet is 'Design for failure': assume hardware components, network lines, and data centers WILL fail, and build automated self-healing mechanisms (Multi-AZ, ASG, health checks) to maintain availability.",
    "hintsJson": "[\"Assume everything will fail, and design for it.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Assume hardware never fails if you choose premium instance types.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Design for failure: assume components will fail and build automated recovery into the architecture.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Deploy all servers in a single data center to eliminate inter-facility latency.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Avoid using backups to optimize disk space.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Assume everything will fail, and design for it."
    ]
  },
  {
    "id": "quiz-16",
    "moduleNumber": 16,
    "topicSlug": "git-command-suite-cheat-sheet-mastery",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Git Internal Architecture & Rebase Mechanics",
    "prompt": "Why should an engineer never run 'git rebase' on a public shared branch such as 'main'?",
    "explanation": "Rebasing creates brand-new commit hashes for existing changes (replaying commits). If others have based their work on the original commits, their history diverges, forcing complex and dangerous reconciliations.",
    "hintsJson": "[\"Remember: rebasing rewrites commit hashes and timestamps.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Because Git will automatically delete the entire repository from GitHub.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Rebasing rewrites commit SHA hashes, creating diverging histories and merge nightmares for collaborators who already pulled the branch.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Rebasing is only allowed on SVN repositories, not Git.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Rebasing compresses files into zip archives that cannot be read by GitHub.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Remember: rebasing rewrites commit hashes and timestamps."
    ]
  },
  {
    "id": "quiz-17",
    "moduleNumber": 16,
    "topicSlug": "git-fundamentals-branching-merge-strategies",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Why Git Outperforms Older VCS Tools",
    "prompt": "According to the Git Concept Guide, what single core trait best describes why Git dramatically outperforms older centralized tools like SVN or CVS for everyday development?",
    "explanation": "Flexibility — Git's cheap local branching, staging area, and support for multiple offline workflows let developers work faster and more independently than centralized, network-dependent tools.",
    "hintsJson": "[\"Think of offline work, local branching, and independent staging.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Rigidity — Git forces every developer to follow the exact same monolithic release branch.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Flexibility — Git's cheap local branching, staging area, and support for offline workflows allow fast, independent development.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Centralization — Git requires all commits to be approved live by an SVN central server.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Compression — Git only allows committing zip archives.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think of offline work, local branching, and independent staging."
    ]
  },
  {
    "id": "quiz-18",
    "moduleNumber": 16,
    "topicSlug": "git-fundamentals-branching-merge-strategies",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Two Core Version Control Actions",
    "prompt": "In foundational Version Control System (VCS) terminology, what are the two core fundamental actions every software engineer performs against a repository?",
    "explanation": "Uploading code into a VCS is called a 'check-in', and downloading code from a VCS is called a 'checkout'.",
    "hintsJson": "[\"Think of checking in changes and checking out files.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Check-in (uploading code to the VCS) and Checkout (downloading code from the VCS).",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "Compile and Link.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Encrypt and Decrypt.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Upload to S3 and Download from CloudFront.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think of checking in changes and checking out files."
    ]
  },
  {
    "id": "quiz-19",
    "moduleNumber": 16,
    "topicSlug": "git-fundamentals-branching-merge-strategies",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Git Identity Configuration Requirement",
    "prompt": "Why does Git strictly require 'user.name' and 'user.email' to be configured before allowing a developer to make commits?",
    "explanation": "Every commit permanently records who created it — Git attaches this identity into the commit metadata so the project's history accurately attributes who changed what.",
    "hintsJson": "[\"Think about historical accountability and team collaboration.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "To bill the developer's credit card per commit made.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Every commit permanently attaches author identity into the snapshot metadata, ensuring clear historical attribution and accountability.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Because Git cannot run without connecting to Google OAuth.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "To send an SMS text message to the developer on each commit.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think about historical accountability and team collaboration."
    ]
  },
  {
    "id": "quiz-20",
    "moduleNumber": 16,
    "topicSlug": "git-fundamentals-branching-merge-strategies",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Safe Unstaging Without Disk Deletion",
    "prompt": "If you accidentally staged a file using 'git add sensitive.env', how do you undo the staging without deleting the file or any of your work from disk?",
    "explanation": "Running 'git rm --cached sensitive.env' or 'git reset sensitive.env' unstages the file (moves it back to untracked/modified) while leaving the actual file on disk untouched. Plain 'git rm' would delete it from disk.",
    "hintsJson": "[\"Look for the command that targets only the cache/staging area.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Run 'rm sensitive.env' in bash.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Run 'git rm sensitive.env' (without flags).",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Run 'git rm --cached sensitive.env' or 'git reset sensitive.env'.",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "Run 'git clean -f sensitive.env'.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Look for the command that targets only the cache/staging area."
    ]
  },
  {
    "id": "quiz-21",
    "moduleNumber": 16,
    "topicSlug": "git-fundamentals-branching-merge-strategies",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "The Hidden Directory Created by git init",
    "prompt": "When you run 'git init' inside an empty directory, what does Git create to turn it into a version-controlled repository?",
    "explanation": "'git init' creates a hidden directory called '.git' where Git stores configuration files, the object database (blobs, trees, commits), refs, and HEAD pointers.",
    "hintsJson": "[\"It is a hidden folder with a dot prefix.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "A hidden folder called '.git' that maintains the local repository database and configuration.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "A file named 'repository.json' in the root directory.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "A zip archive called 'git.zip'.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "A MySQL database called 'git_master'.",
        "isCorrect": false
      }
    ],
    "hints": [
      "It is a hidden folder with a dot prefix."
    ]
  },
  {
    "id": "quiz-22",
    "moduleNumber": 16,
    "topicSlug": "git-command-suite-cheat-sheet-mastery",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Untracked Cleanup: Dry Run vs Force Execution",
    "prompt": "You want to remove untracked build artifacts from your working directory. What command previews which files will be removed without actually deleting them?",
    "explanation": "'git clean -n' shows which files would be removed (dry run); you use the '-f' flag in place of '-n' to actually execute the clean.",
    "hintsJson": "[\"The '-n' flag stands for dry run.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "git clean -f",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "git clean -n (dry run)",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "git status --clean",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "git reset --all",
        "isCorrect": false
      }
    ],
    "hints": [
      "The '-n' flag stands for dry run."
    ]
  },
  {
    "id": "quiz-23",
    "moduleNumber": 16,
    "topicSlug": "git-command-suite-cheat-sheet-mastery",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Diff Inspection: git diff HEAD vs git diff --cached",
    "prompt": "What is the difference between running 'git diff HEAD' and running 'git diff --cached'?",
    "explanation": "'git diff HEAD' shows differences between your current working directory and the last commit, whereas 'git diff --cached' shows differences between staged changes (the index) and the last commit.",
    "hintsJson": "[\"Remember: cached/staged refers strictly to what has been 'git add'-ed.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "'git diff HEAD' shows differences between working directory and last commit; 'git diff --cached' shows difference between staged changes and last commit.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "'git diff HEAD' deletes files; 'git diff --cached' restores files.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "'git diff --cached' only works on Windows; 'git diff HEAD' only works on Linux.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Both commands produce identical output under all circumstances.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Remember: cached/staged refers strictly to what has been 'git add'-ed."
    ]
  },
  {
    "id": "quiz-24",
    "moduleNumber": 16,
    "topicSlug": "git-command-suite-cheat-sheet-mastery",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Log Visualization and Decoration",
    "prompt": "Which flags added to 'git log' draw a text-based branch graph on the left and display the names of branches or tags of commits shown?",
    "explanation": "'--graph' flag draws a text based graph of commits on the left side of commit messages, and '--decorate' adds names of branches or tags of commits shown.",
    "hintsJson": "[\"Look for graph and decorate.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "--graph --decorate",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "--tree --visualize",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "--ascii --branches",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "--color --all",
        "isCorrect": false
      }
    ],
    "hints": [
      "Look for graph and decorate."
    ]
  },
  {
    "id": "quiz-25",
    "moduleNumber": 16,
    "topicSlug": "git-command-suite-cheat-sheet-mastery",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Linear Remote Sync with git pull --rebase",
    "prompt": "What is the primary advantage of executing 'git pull --rebase <remote>' instead of a default 'git pull <remote>'?",
    "explanation": "'git pull --rebase' fetches the remote's copy of the current branch and rebases local commits on top of it, creating a clean linear history and avoiding unnecessary merge bubbles.",
    "hintsJson": "[\"Think of rebase vs 3-way merge commit during sync.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It avoids creating unnecessary 3-way merge commits by replaying local commits on top of upstream changes for a clean linear history.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "It automatically creates a release tag on GitHub.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "It deletes the remote repository to save bandwidth.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It compresses git history into a single zip file.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think of rebase vs 3-way merge commit during sync."
    ]
  },
  {
    "id": "quiz-26",
    "moduleNumber": 16,
    "topicSlug": "github-actions-cicd-matrix-secrets",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "GitHub Actions Workflow Configuration Directory",
    "prompt": "Where must YAML workflow definition files be placed in a Git repository for GitHub Actions to automatically recognize and execute them?",
    "explanation": "GitHub Actions requires all workflow definitions to be stored in the root directory path '.github/workflows/' using the '.yml' or '.yaml' extension.",
    "hintsJson": "[\"It is an exact hidden path starting with .github.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": ".github/workflows/*.yml (or .yaml)",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": ".ci/pipelines/*.json",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "build/workflows/*.xml",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "root directory in a file called Dockerfile",
        "isCorrect": false
      }
    ],
    "hints": [
      "It is an exact hidden path starting with .github."
    ]
  },
  {
    "id": "quiz-27",
    "moduleNumber": 16,
    "topicSlug": "github-actions-cicd-matrix-secrets",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Matrix Testing Strategies in GitHub Actions",
    "prompt": "In a GitHub Actions workflow, what is the primary purpose of defining a 'strategy.matrix' configuration for a job?",
    "explanation": "A matrix strategy automatically generates multiple parallel job runs across combinations of variables (e.g. OS versions, Node.js versions, database engines) without duplicating workflow YAML code.",
    "hintsJson": "[\"Think about testing combinations in parallel without repetitive code.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "To render an HTML table in the pull request comment.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "To spawn parallel isolated runner jobs across combinations of variables (e.g. multiple operating systems and runtime versions) simultaneously.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "To convert GitHub Actions YAML into Jenkins pipelines.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "To enforce biometric authentication for GitHub commits.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think about testing combinations in parallel without repetitive code."
    ]
  },
  {
    "id": "quiz-28",
    "moduleNumber": 16,
    "topicSlug": "github-actions-cicd-matrix-secrets",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Encrypted Secrets & Runner Log Masking",
    "prompt": "How does GitHub Actions protect sensitive credentials stored under Repository Secrets when referenced in a workflow step?",
    "explanation": "GitHub encrypts secrets at rest using Libsodium sealed boxes and automatically masks secret values in the runner console logs with asterisks (***).",
    "hintsJson": "[\"Think of encryption at rest and asterisk masking in console output.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "GitHub sends secrets via unencrypted HTTP to all pull request authors.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "GitHub encrypts secrets at rest and automatically redacts/masks matching secret values with '***' in runner console output logs.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Secrets can only be read if the runner is running Windows XP.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Secrets are converted into public environment variables visible to anyone viewing the repository.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think of encryption at rest and asterisk masking in console output."
    ]
  },
  {
    "id": "quiz-29",
    "moduleNumber": 16,
    "topicSlug": "github-actions-cicd-matrix-secrets",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "GitHub Branch Protection & Required Status Checks",
    "prompt": "In an enterprise GitHub repository, how do you prevent developers from merging broken code into the 'main' branch even if their pull request has been approved by a peer?",
    "explanation": "By configuring Branch Protection Rules with 'Require status checks to pass before merging' enabled, binding the GitHub Actions CI workflow job name as a mandatory blocking check.",
    "hintsJson": "[\"Think about Required Status Checks in branch protection settings.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Disable Git commit capabilities across all developer laptops.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Enable Branch Protection Rules with 'Require status checks to pass before merging' selected, making the CI workflow a mandatory blocker.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Delete the main branch so merges cannot occur.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Rebase the repository once per hour manually.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think about Required Status Checks in branch protection settings."
    ]
  },
  {
    "id": "quiz-30",
    "moduleNumber": 16,
    "topicSlug": "github-actions-cicd-matrix-secrets",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Dependency Caching in GitHub Actions Workflows",
    "prompt": "A GitHub Actions workflow spends 4 minutes downloading npm dependencies on every pull request. Which standard action and mechanism should be used to cache dependencies between workflow runs based on the lockfile hash?",
    "explanation": "The actions/cache action caches dependencies based on a key (e.g. hashFiles('**/package-lock.json')). Subsequent runs restore the cache in seconds if the lockfile hasn't changed, dramatically speeding up CI execution.",
    "hintsJson": "[\"Look into 'actions/cache' and package-lock hash keys.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Commit the entire node_modules folder directly into Git version control.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Use the 'actions/cache' action with a key derived from hashFiles('**/package-lock.json') to store and restore dependencies across workflow runs.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Upgrade the GitHub subscription to Enterprise Diamond tier.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Disable npm package verification and run offline mode.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Look into 'actions/cache' and package-lock hash keys."
    ]
  },
  {
    "id": "quiz-31",
    "moduleNumber": 16,
    "topicSlug": "github-actions-cicd-matrix-secrets",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "GitHub Actions Runners: GitHub-Hosted vs Self-Hosted Security",
    "prompt": "An organization needs a CI/CD runner that can deploy directly into a private AWS VPC without exposing endpoints to the public internet. What is the recommended runner architecture and security guideline for public repositories?",
    "explanation": "Self-hosted runners can be placed directly inside a private AWS VPC subnet with direct access to private resources. However, self-hosted runners should NEVER be used for public open-source repositories because pull requests from untrusted forks can execute arbitrary malicious code on the host machine.",
    "hintsJson": "[\"Consider private VPC network access vs public fork pull request risks.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Deploy a self-hosted runner inside the private VPC, but ensure self-hosted runners are never used on public repositories where untrusted fork PRs could compromise internal infrastructure.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "Use GitHub-hosted runners and assign public elastic IP addresses to all private database instances.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Store AWS root access credentials in public commit messages.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Self-hosted runners cannot run Docker or communicate with AWS APIs.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Consider private VPC network access vs public fork pull request risks."
    ]
  },
  {
    "id": "quiz-32",
    "moduleNumber": 17,
    "topicSlug": "jenkins-architecture-master-agents",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Jenkins Enterprise Controller-Agent Architecture",
    "prompt": "In a production Jenkins cluster, why is it considered a critical best practice to set the number of executors on the Jenkins Controller (Master) to 0?",
    "explanation": "Executing builds on the controller risks exhausting CPU/RAM, crashing the Jenkins web service, and exposes sensitive master credentials to untrusted build scripts.",
    "hintsJson": "[\"Think about resource exhaustion and credentials stored on the controller disk.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Because Jenkins can only compile Java code when running on agents.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "To isolate the controller from heavy build loads (preventing UI crashes) and protect master credentials from malicious build scripts.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Setting executors to 0 shuts down the Jenkins server permanently.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Jenkins plugins only work on Windows machines.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think about resource exhaustion and credentials stored on the controller disk."
    ]
  },
  {
    "id": "quiz-33",
    "moduleNumber": 17,
    "topicSlug": "jenkins-architecture-master-agents",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Core Role of Jenkins in Modern CI/CD",
    "prompt": "According to Jenkins fundamentals, what does Jenkins actually do when automating continuous integration?",
    "explanation": "Jenkins is an automation orchestrator; it does not build or test code itself. It triggers and orchestrates external build tools (compilers, test runners, deployment scripts) in repeatable automated sequences.",
    "hintsJson": "[\"Jenkins is an orchestrator, not a compiler.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It compiles Java and C++ source code into binary files using its internal native compiler.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "It orchestrates external build tools, test frameworks, and deployment scripts in repeatable automated sequences.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "It replaces Git by acting as a centralized version control repository.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It operates as a database server storing application transaction logs.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Jenkins is an orchestrator, not a compiler."
    ]
  },
  {
    "id": "quiz-34",
    "moduleNumber": 17,
    "topicSlug": "jenkins-architecture-master-agents",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Java Runtime Prerequisite for Jenkins",
    "prompt": "Why must a compatible Java Development Kit (JDK/JRE) such as OpenJDK 17 be installed on Linux before installing Jenkins?",
    "explanation": "Jenkins itself is a Java web application that runs on top of the Java Virtual Machine (JVM). Without a compatible JDK/JRE runtime present, the Jenkins service process cannot start.",
    "hintsJson": "[\"Jenkins runs on the Java Virtual Machine.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Because Jenkins is a Java application that executes on the JVM.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "Java is only required if building Android mobile applications.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "To allow developers to connect via JavaScript in browser consoles.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Java provides the Linux kernel network drivers for port 8080.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Jenkins runs on the Java Virtual Machine."
    ]
  },
  {
    "id": "quiz-35",
    "moduleNumber": 17,
    "topicSlug": "jenkins-architecture-master-agents",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Jenkins First-Run Unlock Password Location",
    "prompt": "On a fresh Linux installation, where does Jenkins store the auto-generated initial administrator password required to unlock the setup wizard?",
    "explanation": "Jenkins writes the one-time unlock password to /var/lib/jenkins/secrets/initialAdminPassword on disk.",
    "hintsJson": "[\"Look for the secrets folder in /var/lib/jenkins.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "/var/lib/jenkins/secrets/initialAdminPassword",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "/etc/jenkins/admin.password",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "/home/jenkins/.ssh/id_rsa",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "/usr/share/jenkins/password.txt",
        "isCorrect": false
      }
    ],
    "hints": [
      "Look for the secrets folder in /var/lib/jenkins."
    ]
  },
  {
    "id": "quiz-36",
    "moduleNumber": 17,
    "topicSlug": "jenkins-architecture-master-agents",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Role-Based Access Control in Jenkins",
    "prompt": "Which plugin is the enterprise standard for implementing fine-grained, role-based authorization in Jenkins instead of 'logged-in users can do anything'?",
    "explanation": "The Role-based Authorization Strategy (Role Strategy) plugin allows administrators to define reusable roles (e.g. Developer, QA) with tailored permissions and assign users to those roles.",
    "hintsJson": "[\"Look for the plugin that manages roles.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Role-based Authorization Strategy (Role Strategy plugin)",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "Ant Plugin",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Blue Ocean Plugin",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Timestamper Plugin",
        "isCorrect": false
      }
    ],
    "hints": [
      "Look for the plugin that manages roles."
    ]
  },
  {
    "id": "quiz-37",
    "moduleNumber": 17,
    "topicSlug": "jenkins-architecture-master-agents",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Systemd Service Startup vs Boot Enablement",
    "prompt": "When managing the Jenkins Linux service with systemd, what is the critical difference between 'systemctl start jenkins' and 'systemctl enable jenkins'?",
    "explanation": "'systemctl start' runs the service immediately for the current session, while 'systemctl enable' configures the service to start automatically upon every future system reboot.",
    "hintsJson": "[\"One runs it now, the other configures it to start on server reboot.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "'start' runs Jenkins immediately for current session; 'enable' ensures Jenkins automatically restarts after system reboots.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "'enable' compiles Jenkins; 'start' deploys Jenkins to AWS.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "'start' is for Ubuntu; 'enable' is for Red Hat only.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Both commands perform the exact identical action.",
        "isCorrect": false
      }
    ],
    "hints": [
      "One runs it now, the other configures it to start on server reboot."
    ]
  },
  {
    "id": "quiz-38",
    "moduleNumber": 17,
    "topicSlug": "declarative-jenkinsfile-production-pipelines",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Freestyle Jobs vs Pipeline-as-Code",
    "prompt": "What is the primary architectural advantage of defining a Jenkins pipeline as a 'Jenkinsfile' in source control compared to a UI-configured Freestyle job?",
    "explanation": "A Jenkinsfile is version-controlled, reviewable via pull requests, and travels with the application code it builds, making the build process traceable and recoverable from Git history.",
    "hintsJson": "[\"Think of Pipeline-as-Code and Git version control.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "The build process is version-controlled, reviewable via PRs, and evolves in Git alongside the code it builds.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "Freestyle jobs can only compile Python code, while Jenkinsfiles compile Java.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Freestyle jobs do not support plugins.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Jenkinsfiles run 50 times faster because they bypass Java.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think of Pipeline-as-Code and Git version control."
    ]
  },
  {
    "id": "quiz-39",
    "moduleNumber": 17,
    "topicSlug": "declarative-jenkinsfile-production-pipelines",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "GitHub Webhook Event Trigger Activation",
    "prompt": "A GitHub webhook is configured correctly, and GitHub shows green checkmarks (200 OK) on delivery, but Jenkins never triggers the build. What job setting was most likely omitted?",
    "explanation": "The job's Build Triggers section must have 'GitHub hook trigger for GITScm polling' checked for Jenkins to match incoming webhook payloads to that specific job.",
    "hintsJson": "[\"Check Build Triggers in the job configuration.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "The 'GitHub hook trigger for GITScm polling' checkbox under Build Triggers was not enabled.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "Jenkins was not restarted after pushing code.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "The developer did not sign the commit with a PGP key.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "The repository must be renamed to 'jenkins-repo'.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Check Build Triggers in the job configuration."
    ]
  },
  {
    "id": "quiz-40",
    "moduleNumber": 17,
    "topicSlug": "declarative-jenkinsfile-production-pipelines",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Build Periodically vs Poll SCM Mechanics",
    "prompt": "What is the practical behavioral difference between the 'Build periodically' trigger and the 'Poll SCM' trigger in Jenkins?",
    "explanation": "'Build periodically' triggers a build on a clock schedule regardless of changes, whereas 'Poll SCM' checks the repository on schedule and only triggers a build if new commits exist.",
    "hintsJson": "[\"One always builds; the other checks for new commits first.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Build periodically always builds on schedule even with no code changes; Poll SCM checks the repository and only builds if new commits exist.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "Poll SCM deletes files; Build periodically creates files.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Build periodically only works on Linux; Poll SCM only works on Windows.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "There is no difference; they are aliases for the same trigger.",
        "isCorrect": false
      }
    ],
    "hints": [
      "One always builds; the other checks for new commits first."
    ]
  },
  {
    "id": "quiz-41",
    "moduleNumber": 17,
    "topicSlug": "declarative-jenkinsfile-production-pipelines",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Jenkins 5-Field Cron Syntax Sequence",
    "prompt": "In Jenkins scheduled triggers, what is the exact chronological sequence of the five fields in a cron expression?",
    "explanation": "The 5 fields are: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-7, where 0 and 7 represent Sunday).",
    "hintsJson": "[\"Starts with minute, then hour, day, month, day of week.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Minute, Hour, Day of Month, Month, Day of Week",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "Hour, Minute, Day of Month, Month, Day of Week",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Day of Week, Month, Day of Month, Hour, Minute",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Second, Minute, Hour, Day, Month",
        "isCorrect": false
      }
    ],
    "hints": [
      "Starts with minute, then hour, day, month, day of week."
    ]
  },
  {
    "id": "quiz-42",
    "moduleNumber": 17,
    "topicSlug": "declarative-jenkinsfile-production-pipelines",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "High-Signal Alerting with post { failure }",
    "prompt": "Why is placing email alerts inside a 'post { failure { mail ... } }' block considered superior to sending notifications on every single build?",
    "explanation": "Notifying only on failure keeps alerts meaningful and actionable, preventing teams from developing alert fatigue and ignoring critical broken build notifications.",
    "hintsJson": "[\"Think about alert fatigue from 100 successful build emails a day.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Because email servers charge $10 per sent email.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "It prevents alert fatigue, ensuring notifications remain high-signal so developers don't ignore alerts when a real failure occurs.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Jenkins does not support sending emails on successful builds.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "The failure block is the only block where mail syntax is valid.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think about alert fatigue from 100 successful build emails a day."
    ]
  },
  {
    "id": "quiz-43",
    "moduleNumber": 17,
    "topicSlug": "declarative-jenkinsfile-production-pipelines",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Gating Production Deployments in Declarative Pipelines",
    "prompt": "How do you pause a Declarative Jenkinsfile pipeline before a production deployment stage to wait for explicit human approval?",
    "explanation": "By including an 'input' step inside the deployment stage (e.g. input message: 'Deploy to production?'), which pauses execution waiting for an interactive human decision.",
    "hintsJson": "[\"Look for the step that accepts user input.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Insert an 'input' step inside the deploy stage.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "Add 'sleep 86400' in a shell step.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Shut down the Jenkins agent until someone turns it on.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Set 'agent none' on the deploy stage.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Look for the step that accepts user input."
    ]
  },
  {
    "id": "quiz-44",
    "moduleNumber": 17,
    "topicSlug": "jenkins-selenium-maven-headless-testing",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Purpose of Selenium in Continuous Integration",
    "prompt": "What is the primary role of Selenium WebDriver when integrated into a continuous integration pipeline?",
    "explanation": "Selenium is a browser automation framework used to run automated end-to-end user journey tests against real web applications in browser environments.",
    "hintsJson": "[\"Automates real web browser interactions.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "To automate real browser interactions and assert web application functionality from an end-user perspective.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "To compile Java source code into bytecode.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "To manage Docker container registries.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "To encrypt passwords stored in GitHub secrets.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Automates real web browser interactions."
    ]
  },
  {
    "id": "quiz-45",
    "moduleNumber": 17,
    "topicSlug": "jenkins-selenium-maven-headless-testing",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Maven Dependency Management for Selenium",
    "prompt": "What is the primary advantage of declaring Selenium dependencies in Maven's pom.xml instead of manually adding JAR files in Eclipse?",
    "explanation": "Maven automatically downloads and resolves the exact declared library versions and transitive dependencies consistently on any machine (including Jenkins CI servers), eliminating 'works on my machine' drift.",
    "hintsJson": "[\"Consistency across development laptops and CI servers.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Maven guarantees identical dependency resolution across all machines, eliminating the 'works on my machine because of manual JARs' problem.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "Maven makes Selenium tests run 10 times faster by skipping assertions.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "JAR files cannot be executed on Linux operating systems.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Maven allows running Selenium tests without installing a browser.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Consistency across development laptops and CI servers."
    ]
  },
  {
    "id": "quiz-46",
    "moduleNumber": 17,
    "topicSlug": "jenkins-selenium-maven-headless-testing",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Mandatory WebDriver Teardown via driver.quit()",
    "prompt": "Why is executing 'driver.quit()' in an @After teardown method or finally block mandatory at the end of every Selenium test?",
    "explanation": "'driver.quit()' closes the browser window and cleanly terminates the underlying WebDriver process. Without it, orphan browser processes accumulate on the CI agent, exhausting system memory and crashing subsequent builds.",
    "hintsJson": "[\"Prevents orphan browser processes and memory leaks.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It terminates the WebDriver process and closes browser instances, preventing orphan processes from exhausting CI server memory.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "It commits changes to the Git repository.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "It is optional and has no effect on system resources.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It restarts the Jenkins Controller.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Prevents orphan browser processes and memory leaks."
    ]
  },
  {
    "id": "quiz-47",
    "moduleNumber": 17,
    "topicSlug": "jenkins-selenium-maven-headless-testing",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Headless Browser Requirement on Linux CI Agents",
    "prompt": "Why must Selenium browser tests execute in Headless mode (e.g. '--headless=new') on Linux Jenkins worker agents?",
    "explanation": "Linux servers in CI/CD environments operate without physical monitors or an active graphical X11 display server. Standard headed browsers fail to initialize unless headless mode or Xvfb is configured.",
    "hintsJson": "[\"Linux CI servers lack physical display monitors.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Linux CI servers lack physical monitors and active X11 display servers; running headed tests causes immediate browser startup crashes.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "Headless mode is required because Google Chrome does not support Linux.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Headless mode encrypts the browser traffic using SHA-512.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Headless mode disables JavaScript in web pages.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Linux CI servers lack physical display monitors."
    ]
  },
  {
    "id": "quiz-48",
    "moduleNumber": 17,
    "topicSlug": "jenkins-selenium-maven-headless-testing",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Publishing JUnit Surefire XML Reports in Jenkins",
    "prompt": "Where does the Maven Surefire plugin output test results, and what Jenkins post-build step parses them to visualize pass/fail trends over time?",
    "explanation": "Maven Surefire writes test reports to '**/target/surefire-reports/*.xml', which are published in Declarative Pipelines via 'post { always { junit '**/target/surefire-reports/*.xml' } }'.",
    "hintsJson": "[\"Look for target/surefire-reports and the junit step.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Reports are output to 'target/surefire-reports/*.xml' and published via 'post { always { junit '...' } }'.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "Reports are stored in /tmp/test.log and published via 'git push'.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Reports are written to pom.xml directly.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Reports are emailed directly to GitHub.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Look for target/surefire-reports and the junit step."
    ]
  },
  {
    "id": "quiz-49",
    "moduleNumber": 18,
    "topicSlug": "docker-internals-container-architecture",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Linux Kernel Primitives Powering Docker",
    "prompt": "Which pair of Linux kernel features provides process isolation and hardware resource limits for Docker containers?",
    "explanation": "Namespaces provide isolation (processes only see their own network, mounts, and PIDs), while Control Groups (cgroups) enforce limits on hardware resources like CPU and RAM.",
    "hintsJson": "[\"One isolates what the process sees, the other limits what the process can use.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Hyper-V and VMware Workstation.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Linux Namespaces (isolation) and Control Groups / cgroups (resource quotas).",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Samba file shares and Apache HTTP Server.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "SELinux and AppArmor only, without process scheduling.",
        "isCorrect": false
      }
    ],
    "hints": [
      "One isolates what the process sees, the other limits what the process can use."
    ]
  },
  {
    "id": "quiz-50",
    "moduleNumber": 19,
    "topicNumber": 1,
    "topicSlug": "kubernetes-architecture-control-plane-nodes",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Kubernetes Control Plane Component Roles",
    "prompt": "Which Kubernetes Control Plane component is responsible for evaluating worker node resource capacity and assigning unscheduled Pods to specific healthy nodes?",
    "explanation": "The kube-scheduler detects pods that have no assigned node and runs filtering and scoring algorithms to choose the best available worker node.",
    "hintsJson": "[\"It 'schedules' the pod to a node.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "kube-proxy",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "kube-scheduler",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "kubelet",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "etcd",
        "isCorrect": false
      }
    ],
    "hints": [
      "It 'schedules' the pod to a node."
    ]
  },
  {
    "id": "quiz-51",
    "moduleNumber": 20,
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Production Image Tagging & Rollback Strategy",
    "prompt": "Why is tagging production Docker images with ':latest' considered a dangerous anti-pattern in automated CI/CD pipelines?",
    "explanation": "Using ':latest' is mutable and non-deterministic: you cannot identify which Git commit is running, caching can cause nodes to run different code versions, and rollbacks to previous versions are impossible.",
    "hintsJson": "[\"How do you roll back if every build is called ':latest'?\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Because Docker Hub charges extra for images named 'latest'.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Tagging with ':latest' is mutable and non-deterministic, making audits, caching, and instant rollbacks to a previous working version impossible.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Kubernetes does not support strings in image names.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It causes the Docker daemon to format the host drive.",
        "isCorrect": false
      }
    ],
    "hints": [
      "How do you roll back if every build is called ':latest'?"
    ]
  },
  {
    "id": "quiz-52",
    "moduleNumber": 18,
    "topicSlug": "docker-internals-container-architecture",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Type 1 vs Type 2 Hypervisors in Cloud Virtualization",
    "prompt": "Which of the following correctly pairs a hypervisor type with its architectural definition and real-world example?",
    "explanation": "Type 1 (Bare Metal) hypervisors run directly on the physical hardware without a host OS (e.g., VMware ESXi, KVM, Xen, Hyper-V). Type 2 (Hosted) hypervisors run as software applications on top of an existing host OS (e.g., VMware Workstation, Oracle VirtualBox).",
    "hintsJson": "[\"Type 1 has direct hardware access for enterprise data centers; Type 2 runs on top of a desktop OS like macOS or Windows.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Type 1 runs on top of Windows 11 (e.g. VirtualBox); Type 2 runs directly on bare metal (e.g. ESXi).",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Type 1 runs directly on bare metal hardware (e.g. VMware ESXi, KVM); Type 2 runs on top of a host OS (e.g. VirtualBox, VMware Workstation).",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Type 1 is another name for Docker containers; Type 2 is another name for Kubernetes pods.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Both Type 1 and Type 2 hypervisors share the host Linux kernel directly with all guest applications.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Type 1 has direct hardware access for enterprise data centers; Type 2 runs on top of a desktop OS like macOS or Windows."
    ]
  },
  {
    "id": "quiz-53",
    "moduleNumber": 18,
    "topicSlug": "docker-internals-container-architecture",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Linux Kernel Namespaces Isolation Boundaries",
    "prompt": "Which Linux kernel namespace is responsible for isolating hostnames and domain names, allowing each container to have its own unique system hostname?",
    "explanation": "The UTS (UNIX Timesharing System) namespace isolates hostnames and NIS domain names. When you run a container, Docker assigns the container ID or custom name as the hostname inside this isolated namespace.",
    "hintsJson": "[\"Think of the system call uname() or setting a system hostname.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "PID (Process ID) Namespace",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "NET (Network) Namespace",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "UTS (UNIX Timesharing System) Namespace",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "MNT (Mount) Namespace",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think of the system call uname() or setting a system hostname."
    ]
  },
  {
    "id": "quiz-54",
    "moduleNumber": 18,
    "topicSlug": "docker-internals-container-architecture",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Container Termination with Exit Code 137",
    "prompt": "A container running an intensive batch processing job suddenly stops. Running 'docker inspect' shows ExitCode: 137. What does this exit code specifically indicate?",
    "explanation": "Exit Code 137 indicates 128 + 9 (SIGKILL). In Docker environments, this almost always means the Linux kernel Out-Of-Memory (OOM) Killer terminated the container's process because its memory consumption exceeded the allocated cgroup ceiling.",
    "hintsJson": "[\"Standard Unix exit code formula: 128 + Signal Number. Signal 9 is SIGKILL.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "The container process completed successfully with status 0 and returned a hash code.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "The Linux kernel Out-Of-Memory (OOM) Killer forcefully terminated the process (128 + 9 SIGKILL) for exceeding cgroup memory limits.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "The Dockerfile had a syntax error in the ENTRYPOINT array.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "The container's bridge network IP address had a subnet conflict with the host router.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Standard Unix exit code formula: 128 + Signal Number. Signal 9 is SIGKILL."
    ]
  },
  {
    "id": "quiz-55",
    "moduleNumber": 18,
    "topicSlug": "docker-internals-container-architecture",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Docker Client-Server Communication Protocol",
    "prompt": "By default on a Linux system, how does the Docker CLI client communicate with the Docker daemon (dockerd)?",
    "explanation": "The Docker CLI communicates with dockerd using an HTTP REST API over a local Unix domain socket located at /var/run/docker.sock.",
    "hintsJson": "[\"It uses a local IPC mechanism represented by a special file under /var/run/.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Over public TCP port 80 using standard unencrypted HTTP.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Via an HTTP REST API over the local Unix domain socket '/var/run/docker.sock'.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Through SSH tunneling on port 22 directly into the container namespace.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "By writing flat YAML files into /etc/docker/jobs/ on the host disk.",
        "isCorrect": false
      }
    ],
    "hints": [
      "It uses a local IPC mechanism represented by a special file under /var/run/."
    ]
  },
  {
    "id": "quiz-56",
    "moduleNumber": 18,
    "topicSlug": "docker-internals-container-architecture",
    "topicNumber": 1,
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Security Risk of Adding Users to the 'docker' Group",
    "prompt": "Why is adding a developer's regular user account to the 'docker' group on a shared production host considered equivalent to granting full passwordless root access?",
    "explanation": "Members of the 'docker' group have read/write access to /var/run/docker.sock. Because dockerd runs as root, any user with socket access can run 'docker run -v /:/host alpine chroot /host' to gain unrestricted root access over the host's files, including /etc/shadow and /etc/sudoers.",
    "hintsJson": "[\"Think about what happens when a container mounts the host root directory '/'.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Because Docker automatically alters /etc/passwd and changes the user's UID to 0 upon login.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Any user with access to the Docker socket can launch a container mounting the host's root filesystem ('-v /:/host') and modify system files with root privileges.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "The 'docker' group disables all Linux kernel cgroups and allows unlimited memory allocation.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It exposes SSH keys stored in the user's ~/.ssh folder to Docker Hub public registries.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think about what happens when a container mounts the host root directory '/'."
    ]
  },
  {
    "id": "quiz-57",
    "moduleNumber": 18,
    "topicSlug": "docker-images-dockerfile-registries",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "CMD vs ENTRYPOINT Combined Execution Matrix",
    "prompt": "Given the following Dockerfile instructions:\nENTRYPOINT [\"python\", \"app.py\"]\nCMD [\"--workers=2\"]\n\nIf an operator executes 'docker run my-app:1.0 --workers=8', what command is actually executed inside the container?",
    "explanation": "When both ENTRYPOINT and CMD are present in exec form, CMD supplies the default arguments to the ENTRYPOINT binary. Supplying CLI arguments on 'docker run' completely overrides CMD. Therefore, 'python app.py' runs with the overridden argument '--workers=8'.",
    "hintsJson": "[\"CLI arguments override CMD, but append to ENTRYPOINT.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "python app.py --workers=2 --workers=8",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "python app.py --workers=8",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "--workers=8 (The entrypoint is ignored)",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "The container fails to start due to conflicting argument definitions.",
        "isCorrect": false
      }
    ],
    "hints": [
      "CLI arguments override CMD, but append to ENTRYPOINT."
    ]
  },
  {
    "id": "quiz-58",
    "moduleNumber": 18,
    "topicSlug": "docker-images-dockerfile-registries",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Exec Form vs Shell Form Signal Handling (SIGTERM)",
    "prompt": "Why is the Exec Form ('CMD [\"executable\", \"param\"]') strongly recommended over the Shell Form ('CMD executable param') for production Dockerfiles?",
    "explanation": "In Shell Form, Docker wraps the command inside '/bin/sh -c', making the shell PID 1. Standard Unix shells do not forward SIGTERM to child processes, preventing the application from performing graceful connection draining during 'docker stop' until it is killed forcefully with SIGKILL after 10 seconds.",
    "hintsJson": "[\"Consider how Linux signals (SIGTERM) are handled when a shell wraps your application.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Shell Form produces larger image layers because it compiles bash from source.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Exec Form executes directly as PID 1, allowing the process to receive SIGTERM signals and shut down gracefully.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Exec Form is required because Docker does not support Linux shells in containers.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Shell Form cannot read environment variables defined with ENV.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Consider how Linux signals (SIGTERM) are handled when a shell wraps your application."
    ]
  },
  {
    "id": "quiz-59",
    "moduleNumber": 18,
    "topicSlug": "docker-images-dockerfile-registries",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "ARG vs ENV Instruction Scope",
    "prompt": "What is the primary difference between the ARG and ENV instructions in a Dockerfile?",
    "explanation": "ARG defines variables that are available only during the image build process ('docker build --build-arg') and do not persist in the final image or running container. ENV defines persistent environment variables that remain accessible during both build time and in the running container.",
    "hintsJson": "[\"One is strictly build-time; the other persists into the running container runtime.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "ARG is used for numeric values; ENV is used for string values.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "ARG variables exist only during build time; ENV variables persist in the image metadata and running container environment.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "ARG variables are encrypted with AWS KMS; ENV variables are stored in plain text.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "ENV instructions cannot be overridden at runtime by 'docker run -e'.",
        "isCorrect": false
      }
    ],
    "hints": [
      "One is strictly build-time; the other persists into the running container runtime."
    ]
  },
  {
    "id": "quiz-60",
    "moduleNumber": 18,
    "topicSlug": "docker-images-dockerfile-registries",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "COPY vs ADD Instruction Discipline",
    "prompt": "Why do Docker official best practices recommend using COPY instead of ADD for transferring local files into an image?",
    "explanation": "COPY performs a predictable, literal byte-for-byte copy of local files. ADD includes unexpected side-effects: it automatically extracts local tar archives (which may corrupt files if unexpected) and attempts to download remote URLs without cache optimization.",
    "hintsJson": "[\"ADD has 'magical' auto-decompression features that can introduce unintended behavior.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "ADD is deprecated in Docker 20+ and will cause builds to fail immediately.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "COPY is transparent and copies files literally, whereas ADD auto-extracts tar archives and fetches remote URLs, risking unintended behavior.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "COPY runs as non-root user by default, while ADD always runs as root.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "ADD does not support copying entire directories.",
        "isCorrect": false
      }
    ],
    "hints": [
      "ADD has 'magical' auto-decompression features that can introduce unintended behavior."
    ]
  },
  {
    "id": "quiz-61",
    "moduleNumber": 18,
    "topicSlug": "docker-images-dockerfile-registries",
    "topicNumber": 2,
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Alpine musl libc vs Debian glibc Incompatibility",
    "prompt": "A Python development team switches from 'python:3.11-slim' to 'python:3.11-alpine'. Their builds for services using NumPy, Pandas, and Cryptography take 30 minutes to complete or fail to start. What is the fundamental technical reason?",
    "explanation": "Alpine Linux uses musl libc instead of the standard GNU C Library (glibc). Most pre-compiled Python binary wheels on PyPI are built for glibc (manylinux). On Alpine, pip cannot use pre-compiled wheels and must download source tarballs and compile all C extensions from scratch.",
    "hintsJson": "[\"Look at the C standard library implementation differences between Alpine and Debian.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Alpine Linux does not support Python 3.11 runtimes.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Alpine uses musl libc instead of glibc; pre-compiled manylinux binary wheels on PyPI require glibc, forcing pip to compile from C source.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Alpine Linux requires all Python packages to be signed with Apple Developer certificates.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "The Alpine package manager (apk) permanently disables compiling C extensions.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Look at the C standard library implementation differences between Alpine and Debian."
    ]
  },
  {
    "id": "quiz-62",
    "moduleNumber": 18,
    "topicSlug": "dockerfile-multistage-compose-networking",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Default Bridge vs User-Defined Bridge DNS Resolution",
    "prompt": "You start two containers, 'web' and 'api', on Docker's default bridge network ('docker0'). When 'web' tries to connect to 'http://api:8080', DNS resolution fails ('getaddrinfo ENOTFOUND api'). How do you enable automatic container name resolution?",
    "explanation": "Docker's default bridge network ('docker0') does NOT provide automatic DNS resolution. Connecting the containers to a user-defined custom bridge network enables Docker's embedded DNS server (127.0.0.11), which automatically resolves container names and service aliases.",
    "hintsJson": "[\"The default bridge requires legacy --link, while custom bridge networks have built-in DNS.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Hardcode the public IP address of the AWS EC2 host inside /etc/hosts.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Create and connect both containers to a user-defined custom bridge network ('docker network create my-net').",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Restart the Docker daemon with the '--allow-all-dns' flag.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Change the container names to match their respective host MAC addresses.",
        "isCorrect": false
      }
    ],
    "hints": [
      "The default bridge requires legacy --link, while custom bridge networks have built-in DNS."
    ]
  },
  {
    "id": "quiz-63",
    "moduleNumber": 18,
    "topicSlug": "dockerfile-multistage-compose-networking",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Docker Compose 'depends_on' Startup vs Readiness",
    "prompt": "In a Docker Compose file, you configure your web service with 'depends_on: - db'. Upon running 'docker compose up', your web service immediately crashes with 'Connection Refused: db:5432'. Why did this happen?",
    "explanation": "'depends_on' only waits for the database container process to start running (PID 1 alive), not for the database engine to finish initialization, replay transaction logs, and open its listening TCP port.",
    "hintsJson": "[\"Process start does not equal application TCP listening readiness.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "The 'depends_on' instruction was deprecated in Compose V2 and is completely ignored.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "'depends_on' only waits for the db container to start, not for the database software to finish initializing and accept TCP connections.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "The web container was built with an invalid ENTRYPOINT.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Docker Compose automatically blocks all port traffic between services unless 'expose' is specified.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Process start does not equal application TCP listening readiness."
    ]
  },
  {
    "id": "quiz-64",
    "moduleNumber": 18,
    "topicSlug": "dockerfile-multistage-compose-networking",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Docker Compose Healthcheck Readiness Gating",
    "prompt": "In Docker Compose V2, how do you correctly configure a service to wait until a dependent database is actually healthy and accepting queries before starting?",
    "explanation": "You define a 'healthcheck' block on the database service (e.g. pg_isready) and update the dependent service's 'depends_on' to use: 'depends_on: db: condition: service_healthy'.",
    "hintsJson": "[\"Look for the condition attribute under depends_on.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Set 'sleep 30' in the web service command before starting the app.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Define a 'healthcheck' on the database and specify 'depends_on: <service>: condition: service_healthy' in the dependent service.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Use the '--wait-for-port' flag in 'docker compose up --wait-for-port 5432'.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Run the database on the host network and the web app on the bridge network.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Look for the condition attribute under depends_on."
    ]
  },
  {
    "id": "quiz-65",
    "moduleNumber": 18,
    "topicSlug": "dockerfile-multistage-compose-networking",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Disaster Risk of 'docker compose down -v'",
    "prompt": "What is the critical consequence of executing 'docker compose down -v' on a staging or production server?",
    "explanation": "The '-v' (or '--volumes') flag instructs Docker Compose to delete all named volumes defined in the 'volumes:' section, permanently wiping all persistent database files, uploaded media, and stored state.",
    "hintsJson": "[\"The -v flag stands for volumes.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It prints verbose debugging output while stopping containers.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "It removes containers, networks, AND permanently deletes all named persistent data volumes declared in the Compose file.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "It validates the YAML syntax without making any changes to running containers.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It pauses containers instead of stopping them to save memory.",
        "isCorrect": false
      }
    ],
    "hints": [
      "The -v flag stands for volumes."
    ]
  },
  {
    "id": "quiz-66",
    "moduleNumber": 18,
    "topicSlug": "dockerfile-multistage-compose-networking",
    "topicNumber": 3,
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Storage Mechanism for Production Databases",
    "prompt": "Why should stateful production databases like PostgreSQL and MySQL store their data in Docker Named Volumes rather than the container's default writable layer?",
    "explanation": "Named volumes are stored outside the ephemeral container lifecycle under /var/lib/docker/volumes/_data and bypass the Copy-on-Write (CoW) OverlayFS driver, providing native disk I/O performance and data persistence across container updates and restarts.",
    "hintsJson": "[\"Consider performance (bypassing Copy-on-Write) and lifecycle (surviving container destruction).\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Because Docker automatically compresses named volumes using gzip.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Named volumes persist data independently of the container lifecycle and bypass the Copy-on-Write storage driver for native I/O speed.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Named volumes automatically replicate data across AWS regions without internet access.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Containers running on Linux cannot write to the container layer without a license key.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Consider performance (bypassing Copy-on-Write) and lifecycle (surviving container destruction)."
    ]
  },
  {
    "id": "quiz-67",
    "moduleNumber": 19,
    "topicNumber": 1,
    "topicSlug": "kubernetes-architecture-control-plane-nodes",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "etcd Distributed Consensus & Quorum Requirements",
    "prompt": "In a production high-availability Kubernetes cluster, an administrator plans to configure the etcd cluster. Why must an etcd cluster strictly use an odd number of nodes (3, 5, or 7), and how many node failures can a 5-node etcd cluster tolerate before losing write quorum?",
    "explanation": "etcd uses the Raft consensus algorithm which requires a strict majority quorum: (N / 2) + 1. For a 5-node cluster, quorum is (5 / 2) + 1 = 3 nodes. Therefore, it can tolerate at most 2 node failures (5 - 3 = 2). An even number of nodes (e.g. 6) requires 4 nodes for quorum, tolerating only 2 failures—providing no extra fault tolerance while increasing network latency and split-brain risk.",
    "hintsJson": "[\"Recall the Raft quorum formula: floor(N / 2) + 1.\",\"Calculate 5 - quorum to find the maximum allowed node failures.\",\"Even numbers add overhead without increasing failure tolerance.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Odd nodes prevent split-brain; a 5-node cluster requires 3 nodes for quorum and can tolerate 2 node failures.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "Odd nodes are required by Linux kernel licensing; a 5-node cluster can tolerate up to 4 node failures.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Even nodes cause CPU deadlock; a 5-node cluster tolerates 3 node failures.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Odd nodes enable asynchronous replication; a 5-node cluster tolerates only 1 node failure.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Recall the Raft quorum formula: floor(N / 2) + 1.",
      "Calculate 5 - quorum to find the maximum allowed node failures.",
      "Even numbers add overhead without increasing failure tolerance."
    ]
  },
  {
    "id": "quiz-68",
    "moduleNumber": 19,
    "topicNumber": 1,
    "topicSlug": "kubernetes-architecture-control-plane-nodes",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Worker Node Execution: Kubelet vs Container Runtime Interface (CRI)",
    "prompt": "What is the primary responsibility of the `kubelet` agent on a Kubernetes worker node, and how does it interface with container runtimes such as containerd or CRI-O?",
    "explanation": "The kubelet is the primary node agent that registers the worker node with the API server, receives PodSpecs from kube-apiserver, and invokes the Container Runtime Interface (CRI) via gRPC to pull images and start/stop containers. It also monitors container health via probes and reports node resource utilization.",
    "hintsJson": "[\"The kubelet is the worker node's 'local captain'.\",\"It doesn't start containers directly; it issues gRPC calls to the CRI (containerd).\",\"It also executes Liveness and Readiness probes.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It writes state directly to the etcd cluster and schedules pods across other nodes.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "It watches PodSpecs from kube-apiserver and communicates with containerd/CRI-O via the CRI gRPC specification to run containers and monitor health.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "It routes Layer 7 HTTP ingress traffic from public domain names into ClusterIP services.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It generates Helm package charts and packages Dockerfiles into multi-stage images.",
        "isCorrect": false
      }
    ],
    "hints": [
      "The kubelet is the worker node's 'local captain'.",
      "It doesn't start containers directly; it issues gRPC calls to the CRI (containerd).",
      "It also executes Liveness and Readiness probes."
    ]
  },
  {
    "id": "quiz-69",
    "moduleNumber": 19,
    "topicNumber": 1,
    "topicSlug": "kubernetes-architecture-control-plane-nodes",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Kubernetes Cluster Provisioning: kind vs kubeadm vs Managed EKS",
    "prompt": "A developer wants to test multi-node Kubernetes networking and Helm deployments locally on their laptop in lightweight Docker containers without spinning up multiple heavy virtual machines. Which tool is purpose-built for this exact workflow?",
    "explanation": "kind (Kubernetes IN Docker) runs local Kubernetes clusters by treating Docker containers as individual cluster nodes. It supports multi-node topologies (1 control-plane, 2 workers) with near-instant spin-up and teardown, making it ideal for local testing and CI/CD pipelines.",
    "hintsJson": "[\"Think about 'Kubernetes IN Docker'.\",\"It boots worker and control plane nodes as standard Docker containers.\",\"The CLI command is 'kind create cluster'.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "kubeadm on bare metal servers",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "AWS Elastic Kubernetes Service (EKS)",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "kind (Kubernetes in Docker)",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "VirtualBox with manual Linux kernel recompilation",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think about 'Kubernetes IN Docker'.",
      "It boots worker and control plane nodes as standard Docker containers.",
      "The CLI command is 'kind create cluster'."
    ]
  },
  {
    "id": "quiz-70",
    "moduleNumber": 19,
    "topicNumber": 1,
    "topicSlug": "kubernetes-architecture-control-plane-nodes",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "kube-apiserver: Central Communication Hub & Data Access Rules",
    "prompt": "In Kubernetes Control Plane architecture, which component is permitted to directly read from and write to the `etcd` distributed key-value store?",
    "explanation": "kube-apiserver is the ONLY component in the entire Kubernetes cluster that directly accesses etcd. All other components (kube-scheduler, controller-manager, kubelet, kubectl) communicate exclusively via REST calls to the kube-apiserver, which enforces authentication, authorization (RBAC), and admission control.",
    "hintsJson": "[\"No worker node or controller communicates with etcd directly.\",\"The API Server is the sole gatekeeper and single source of truth validator.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "kube-scheduler and kube-controller-manager read directly from etcd disk files.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "kubelet communicates directly with etcd over port 2379 for fast heartbeat reporting.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Only kube-apiserver directly accesses etcd; all other cluster components must query the API Server via REST.",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "Any component running in the kube-system namespace has direct read/write disk access to etcd.",
        "isCorrect": false
      }
    ],
    "hints": [
      "No worker node or controller communicates with etcd directly.",
      "The API Server is the sole gatekeeper and single source of truth validator."
    ]
  },
  {
    "id": "quiz-71",
    "moduleNumber": 19,
    "topicNumber": 1,
    "topicSlug": "kubernetes-architecture-control-plane-nodes",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Container Network Interface (CNI) Plugin Architecture",
    "prompt": "A newly initialized Kubernetes cluster has nodes showing `STATUS: NotReady`. The administrator checks events and sees `runtime network not ready: NetworkReady=false reason:NetworkPluginNotReady`. What is the root cause and required fix?",
    "explanation": "Kubernetes core does not ship with an active Pod networking implementation. Nodes remain in NotReady status until a Container Network Interface (CNI) plugin (such as Calico, Flannel, or Cilium) is deployed to configure the virtual network interfaces, IP address management (IPAM), and pod routing.",
    "hintsJson": "[\"Kubernetes relies on the CNI specification for pod-to-pod networking.\",\"Examples include Calico, Flannel, Cilium, or AWS VPC CNI.\",\"Without a CNI, CoreDNS also remains in Pending status.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "The cluster needs a reboot because the Linux kernel hostname changed.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "No CNI plugin has been installed; deploying a CNI plugin (e.g. Calico or Flannel) configures pod networking and switches nodes to Ready.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "The Docker daemon does not support TLS certificates.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "The cluster administrator forgot to purchase an AWS Network Load Balancer license.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Kubernetes relies on the CNI specification for pod-to-pod networking.",
      "Examples include Calico, Flannel, Cilium, or AWS VPC CNI.",
      "Without a CNI, CoreDNS also remains in Pending status."
    ]
  },
  {
    "id": "quiz-72",
    "moduleNumber": 19,
    "topicNumber": 2,
    "topicSlug": "kubernetes-objects-workloads-networking-storage",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Pod vs Deployment: Production Self-Healing Capabilities",
    "prompt": "Why is deploying standalone 'bare Pods' (using `kind: Pod`) strongly discouraged in production environments compared to using a `Deployment`?",
    "explanation": "A standalone Pod is bound directly to a single worker node. If that worker node crashes, reboots, or suffers hardware failure, the standalone Pod is permanently lost and will NEVER be rescheduled elsewhere. Deployments manage ReplicaSets, ensuring declarative desired state reconciliation and automatic replacement of failed pods on healthy nodes.",
    "hintsJson": "[\"What happens to a standalone Pod if its hosting EC2 instance is terminated?\",\"Which object has a controller that reconciles actual replicas to desired replicas?\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Standalone Pods cannot run Linux containers, only Windows containers.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Standalone Pods are not self-healing; if their hosting node dies, they are never rescheduled. Deployments maintain desired replica counts via ReplicaSets across node failures.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Deployments allow containers to run without Docker, while Pods require root Docker daemon access.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Pods consume twice as much RAM as Deployments due to duplicate kernel namespaces.",
        "isCorrect": false
      }
    ],
    "hints": [
      "What happens to a standalone Pod if its hosting EC2 instance is terminated?",
      "Which object has a controller that reconciles actual replicas to desired replicas?"
    ]
  },
  {
    "id": "quiz-73",
    "moduleNumber": 19,
    "topicNumber": 2,
    "topicSlug": "kubernetes-objects-workloads-networking-storage",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Kubernetes Service Types & Default Port Allocations",
    "prompt": "Which Kubernetes Service type opens a static high-numbered port across every worker node's physical IP address, and what is the standard default port range allocated by Kubernetes?",
    "explanation": "NodePort exposes the Service on each Node's IP at a static port in the default range 30000-32767. External clients can connect to `<NodeIP>:<NodePort>`, and kube-proxy routes traffic to backend pods.",
    "hintsJson": "[\"ClusterIP is internal-only.\",\"NodePort allocates high ports between 30000 and 32767.\",\"LoadBalancer provisions a cloud provider L4 balancer.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "ClusterIP on port 80 or 443",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "NodePort in the range 30000–32767",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "LoadBalancer in the range 1024–2048",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "ExternalName on port 8080",
        "isCorrect": false
      }
    ],
    "hints": [
      "ClusterIP is internal-only.",
      "NodePort allocates high ports between 30000 and 32767.",
      "LoadBalancer provisions a cloud provider L4 balancer."
    ]
  },
  {
    "id": "quiz-74",
    "moduleNumber": 19,
    "topicNumber": 2,
    "topicSlug": "kubernetes-objects-workloads-networking-storage",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "ConfigMaps vs Secrets: Encoding & Usage Patterns",
    "prompt": "An engineer needs to pass application configurations into a Pod. How should non-confidential environment flags (like `LOG_LEVEL=info`) and confidential database credentials (like `DB_PASSWORD`) be stored and decoupled in Kubernetes?",
    "explanation": "ConfigMaps store non-sensitive configuration data in plaintext key-value pairs. Secrets store sensitive credentials (passwords, tokens, TLS keys) encoded in base64 (or encrypted at rest via KMS). Both can be consumed by Pods as environment variables or mounted files.",
    "hintsJson": "[\"ConfigMaps are for plaintext configuration settings.\",\"Secrets are for sensitive credentials and tokens.\",\"Both decouple configuration from immutable container images.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Both should be hardcoded directly into the Dockerfile `ENV` instructions.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Store non-sensitive flags in a ConfigMap and sensitive database credentials in a Secret, mounted as environment variables or volume files.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "ConfigMaps are encrypted with AES-256 while Secrets are stored in plaintext.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Secrets must only be created inside the default namespace and cannot be mounted into pods.",
        "isCorrect": false
      }
    ],
    "hints": [
      "ConfigMaps are for plaintext configuration settings.",
      "Secrets are for sensitive credentials and tokens.",
      "Both decouple configuration from immutable container images."
    ]
  },
  {
    "id": "quiz-75",
    "moduleNumber": 19,
    "topicNumber": 2,
    "topicSlug": "kubernetes-objects-workloads-networking-storage",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Storage Lifecycle: PersistentVolume Reclaim Policies",
    "prompt": "A database administrator deletes a PersistentVolumeClaim (`kubectl delete pvc postgres-data`). The underlying PersistentVolume has its `persistentVolumeReclaimPolicy` set to `Retain`. What happens to the cloud storage volume and the PV object?",
    "explanation": "With the Retain policy, deleting the PVC does NOT delete the PV or the underlying cloud storage volume (e.g. AWS EBS). The PV enters the 'Released' status and retains all historical data, preventing any other claim from overwriting it until an administrator manually recovers or reclaims the data.",
    "hintsJson": "[\"Recall the difference between 'Delete' and 'Retain'.\",\"Delete purges the cloud volume immediately.\",\"Retain preserves data for safety and enters 'Released' state.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "The cloud storage volume and all its database files are immediately purged and permanently deleted.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "The PV is automatically bound to the nearest available Pod in any namespace.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "The PV enters the 'Released' status and the physical cloud storage remains completely intact with all data preserved for manual recovery.",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "The cluster API Server crashes because dangling PVs are rejected by Kubernetes.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Recall the difference between 'Delete' and 'Retain'.",
      "Delete purges the cloud volume immediately.",
      "Retain preserves data for safety and enters 'Released' state."
    ]
  },
  {
    "id": "quiz-76",
    "moduleNumber": 19,
    "topicNumber": 2,
    "topicSlug": "kubernetes-objects-workloads-networking-storage",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "DaemonSet vs StatefulSet Use Cases",
    "prompt": "You need to deploy two workloads: (1) a log collector agent (Fluentd) that must run exactly one instance on every worker node in the cluster, and (2) a clustered Kafka broker where each instance requires a stable hostname (kafka-0, kafka-1) and dedicated persistent storage. Which controllers should you use?",
    "explanation": "DaemonSets guarantee that all (or some) nodes run exactly one copy of a Pod, making them standard for node-level agents (logs, monitoring, CNI). StatefulSets manage stateful applications requiring unique network identities (ordinal indexing like kafka-0) and dedicated persistent volumes per pod.",
    "hintsJson": "[\"One pod per node = DaemonSet.\",\"Stable network identities (pod-0, pod-1) and stateful disks = StatefulSet.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Deploy Fluentd with a Deployment and Kafka with a CronJob.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Deploy Fluentd with a DaemonSet and Kafka with a StatefulSet.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Deploy Fluentd with a ReplicaSet and Kafka with a DaemonSet.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Deploy Fluentd as an Ingress Controller and Kafka as a ConfigMap.",
        "isCorrect": false
      }
    ],
    "hints": [
      "One pod per node = DaemonSet.",
      "Stable network identities (pod-0, pod-1) and stateful disks = StatefulSet."
    ]
  },
  {
    "id": "quiz-77",
    "moduleNumber": 19,
    "topicNumber": 2,
    "topicSlug": "kubernetes-objects-workloads-networking-storage",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Health Probes: Liveness vs Readiness vs Startup Probes",
    "prompt": "A microservice experiences sudden traffic saturation, causing its response time to degrade from 50ms to 4 seconds. If a Readiness probe fails, what action does the kubelet take compared to a failed Liveness probe?",
    "explanation": "When a Readiness probe fails, the kubelet stops routing traffic to the Pod by removing its IP from the Service endpoints; it does NOT terminate or restart the container. In contrast, when a Liveness probe fails, the kubelet immediately kills and restarts the container.",
    "hintsJson": "[\"Readiness controls traffic routing (Endpoints).\",\"Liveness controls container restart/lifecycle.\",\"Failing a readiness probe isolates the pod from customer requests.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Readiness probe kills the pod immediately; Liveness probe sends an email alert to the cluster administrator.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Readiness probe isolates the pod by removing its IP from Service Endpoints without restarting it; Liveness probe forcefully kills and restarts the container.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Both probes trigger immediate container deletion and node reboot.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Readiness probe scales up the Deployment replica count by 2.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Readiness controls traffic routing (Endpoints).",
      "Liveness controls container restart/lifecycle.",
      "Failing a readiness probe isolates the pod from customer requests."
    ]
  },
  {
    "id": "quiz-78",
    "moduleNumber": 19,
    "topicNumber": 3,
    "topicSlug": "k8s-workloads-services-networking-helm",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "RollingUpdate Strategy: maxSurge and maxUnavailable Calculations",
    "prompt": "A Deployment has `replicas: 4`, `maxSurge: 1`, and `maxUnavailable: 0` configured under its `RollingUpdate` strategy. During an image upgrade, what are the maximum number of total pods that can exist concurrently, and what is the minimum number of healthy pods that must be available to serve user traffic?",
    "explanation": "maxSurge: 1 allows at most desired replicas + 1 = 4 + 1 = 5 pods concurrently. maxUnavailable: 0 mandates that no pods may be unavailable below desired, meaning at least 4 healthy pods must be serving traffic at all times throughout the rollout.",
    "hintsJson": "[\"Max concurrent pods = desired + maxSurge.\",\"Min available pods = desired - maxUnavailable.\",\"With maxUnavailable: 0, capacity never drops below 100%.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Maximum 5 total pods concurrently; minimum 4 available healthy pods serving traffic at all times.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "Maximum 4 total pods concurrently; minimum 0 available pods (complete shutdown).",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Maximum 8 total pods concurrently; minimum 2 available pods.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Maximum 1 total pod concurrently; minimum 4 available pods.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Max concurrent pods = desired + maxSurge.",
      "Min available pods = desired - maxUnavailable.",
      "With maxUnavailable: 0, capacity never drops below 100%."
    ]
  },
  {
    "id": "quiz-79",
    "moduleNumber": 19,
    "topicNumber": 3,
    "topicSlug": "k8s-workloads-services-networking-helm",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Deployment Rollback Mechanics with kubectl",
    "prompt": "After updating a production Deployment, the new version encounters runtime errors. Which `kubectl` command immediately rolls back the Deployment to the previous working ReplicaSet revision?",
    "explanation": "The command 'kubectl rollout undo deployment/<name>' rolls back the Deployment to its previous revision by scaling up the previous ReplicaSet and scaling down the broken ReplicaSet. Adding '--to-revision=<N>' rolls back to a specific historical revision.",
    "hintsJson": "[\"The command uses the 'rollout' subcommand.\",\"Think of 'undoing' the changes.\",\"You can also check history with 'kubectl rollout history'.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "kubectl delete deployment <name> --force",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "kubectl rollback deployment <name> --hard",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "kubectl rollout undo deployment/<name>",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "kubectl reset deployment <name>",
        "isCorrect": false
      }
    ],
    "hints": [
      "The command uses the 'rollout' subcommand.",
      "Think of 'undoing' the changes.",
      "You can also check history with 'kubectl rollout history'."
    ]
  },
  {
    "id": "quiz-80",
    "moduleNumber": 19,
    "topicNumber": 3,
    "topicSlug": "k8s-workloads-services-networking-helm",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Horizontal Pod Autoscaler (HPA) Prerequisites & Behavior",
    "prompt": "An engineer creates an HPA targeting 50% CPU utilization. However, `kubectl get hpa` shows `TARGETS: <unknown>/50%` and the Deployment never scales up during load testing. What is the most likely root cause?",
    "explanation": "HPA calculates CPU utilization as (Actual CPU Usage / CPU Request) * 100. If the container template does not declare 'resources.requests.cpu', HPA has no baseline denominator and cannot compute utilization, resulting in '<unknown>' targets and scaling failure.",
    "hintsJson": "[\"HPA requires a baseline denominator to calculate percentage utilization.\",\"Look at the 'resources' block in the pod specification.\",\"Without 'requests.cpu', target utilization cannot be evaluated.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "The Docker daemon does not support multi-threading.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "The container specification is missing `resources.requests.cpu`, preventing HPA from calculating percentage utilization against a declared baseline.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "The HPA only scales Pods if memory utilization exceeds 95%.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "The Service must be converted from ClusterIP to NodePort for HPA to activate.",
        "isCorrect": false
      }
    ],
    "hints": [
      "HPA requires a baseline denominator to calculate percentage utilization.",
      "Look at the 'resources' block in the pod specification.",
      "Without 'requests.cpu', target utilization cannot be evaluated."
    ]
  },
  {
    "id": "quiz-81",
    "moduleNumber": 19,
    "topicNumber": 3,
    "topicSlug": "k8s-workloads-services-networking-helm",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Helm Chart Directory Structure & Component Roles",
    "prompt": "In a standard Helm 3 chart directory, which file defines the chart metadata (such as chart name, version, and apiVersion), and which file provides default configurable values for templates?",
    "explanation": "`Chart.yaml` contains package metadata (name, version, description, dependencies). `values.yaml` provides default parameter values that are interpolated into YAML templates located inside the `templates/` directory.",
    "hintsJson": "[\"Chart.yaml contains metadata.\",\"values.yaml contains configurable default parameters.\",\"templates/ contains the Go-templated manifests.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Dockerfile defines chart metadata; package.json provides default values.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Chart.yaml defines chart metadata and semver; values.yaml provides default configurable values for templates.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "kustomization.yaml defines metadata; helm.config defines values.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "metadata.json defines chart versions; index.html renders the parameters.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Chart.yaml contains metadata.",
      "values.yaml contains configurable default parameters.",
      "templates/ contains the Go-templated manifests."
    ]
  },
  {
    "id": "quiz-82",
    "moduleNumber": 19,
    "topicNumber": 3,
    "topicSlug": "k8s-workloads-services-networking-helm",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Helm Release Management Commands",
    "prompt": "Which Helm command is used to upgrade an existing release named `web-app` using a local chart `./charts/web-app` while overriding the replica count to 5?",
    "explanation": "The command 'helm upgrade web-app ./charts/web-app --set replicaCount=5' upgrades the release and overrides the replicaCount parameter without modifying the underlying chart files.",
    "hintsJson": "[\"Use the 'upgrade' subcommand.\",\"Use '--set' for ad-hoc parameter overrides.\",\"Pass the release name and chart path.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "helm deploy web-app --replicas 5",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "helm patch web-app -p 'replicas: 5'",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "helm upgrade web-app ./charts/web-app --set replicaCount=5",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "helm scale web-app --count=5",
        "isCorrect": false
      }
    ],
    "hints": [
      "Use the 'upgrade' subcommand.",
      "Use '--set' for ad-hoc parameter overrides.",
      "Pass the release name and chart path."
    ]
  },
  {
    "id": "quiz-83",
    "moduleNumber": 19,
    "topicNumber": 3,
    "topicSlug": "k8s-workloads-services-networking-helm",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Batch Workloads: Kubernetes Job vs CronJob",
    "prompt": "An engineering team needs to execute a database migration script that runs once to completion and then exits, and also a nightly database backup script that runs at 02:00 AM every day. Which Kubernetes workload objects should be used?",
    "explanation": "A Kubernetes Job creates Pods that run until a specified number of them successfully terminate (exit code 0). A CronJob runs Jobs on a recurring schedule defined by standard crontab syntax (e.g. `0 2 * * *`).",
    "hintsJson": "[\"A one-off run-to-completion task is a Job.\",\"A scheduled recurring task based on cron syntax is a CronJob.\",\"Deployments and DaemonSets are for long-running services, not batch completions.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Use a Deployment for the migration and a StatefulSet for the nightly backup.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Use a Job for the one-time database migration and a CronJob for the nightly backup.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Use a DaemonSet for the migration and an Ingress for the nightly backup.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Use a ReplicaSet for both with restartPolicy: Always.",
        "isCorrect": false
      }
    ],
    "hints": [
      "A one-off run-to-completion task is a Job.",
      "A scheduled recurring task based on cron syntax is a CronJob.",
      "Deployments and DaemonSets are for long-running services, not batch completions."
    ]
  },
  {
    "id": "quiz-84",
    "moduleNumber": 1,
    "topicNumber": 1,
    "topicSlug": "aws-account-creation-root-security-iam",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "AWS Account Registration Payment Card Verification",
    "prompt": "During AWS account registration, why does AWS request international payment card details even when selecting the Free Tier plan, and what financial transaction actually takes place?",
    "explanation": "AWS requires a valid payment card to verify customer identity and curb automated free-tier abuse. AWS initiates a temporary pre-authorization ping of ~₹2 INR (or $1 USD) which is automatically refunded/voided immediately.",
    "hintsJson": "[\"It verifies identity, not an immediate subscription fee.\",\"The small verification charge is refunded automatically.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "AWS charges a non-refundable $100 registration deposit.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "AWS charges a small temporary authorization fee (~₹2 or $1) that is automatically refunded, purely to verify identity and curb automated abuse.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Payment cards are required only for enterprise accounts, not individual accounts.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "AWS withdraws funds to purchase Amazon stock on your behalf.",
        "isCorrect": false
      }
    ],
    "hints": [
      "It verifies identity, not an immediate subscription fee.",
      "The small verification charge is refunded automatically."
    ]
  },
  {
    "id": "quiz-85",
    "moduleNumber": 1,
    "topicNumber": 1,
    "topicSlug": "aws-account-creation-root-security-iam",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Root Account Multi-Factor Authentication (MFA) Priority",
    "prompt": "What is the very first and highest-priority security action an engineer must perform immediately after creating a new AWS account?",
    "explanation": "Securing the Root user with Multi-Factor Authentication (MFA) is top priority because the root user has unrestricted omnipotence over the entire account, all billing, and all resources.",
    "hintsJson": "[\"Think about the supreme account credentials.\",\"What prevents password-only compromises?\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Launch an EC2 instance in every available region.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Enable Multi-Factor Authentication (MFA) on the Root Account and create an IAM User for daily tasks.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Generate permanent root access keys and commit them to Git.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Upgrade immediately to the $15,000 Enterprise Support plan.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think about the supreme account credentials.",
      "What prevents password-only compromises?"
    ]
  },
  {
    "id": "quiz-86",
    "moduleNumber": 1,
    "topicNumber": 1,
    "topicSlug": "aws-account-creation-root-security-iam",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "AWS Support Plan Selection for Learning & Beginners",
    "prompt": "During the AWS signup workflow, which Support Plan is cost-free ($0/month) and includes 24/7 customer service and Personal Health Dashboard access?",
    "explanation": "The Basic Support plan is 100% free of cost and includes 24/7 access to customer service and billing support, documentation, and the Personal Health Dashboard.",
    "hintsJson": "[\"The plan is called 'Basic Support - Free'.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Developer Support ($29/month)",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Business Support ($100/month)",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Basic Support (Free of cost)",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "Enterprise On-Ramp Support",
        "isCorrect": false
      }
    ],
    "hints": [
      "The plan is called 'Basic Support - Free'."
    ]
  },
  {
    "id": "quiz-87",
    "moduleNumber": 1,
    "topicNumber": 1,
    "topicSlug": "aws-account-creation-root-security-iam",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "AWS Budgets Threshold Guardrails",
    "prompt": "An engineer wants an immediate automated email notification if total monthly AWS spending crosses $1.00 USD. Which AWS service is purpose-built to configure this exact guardrail?",
    "explanation": "AWS Budgets allows setting custom cost and usage limits that trigger automated email notifications or SNS alerts when actual or forecasted charges exceed the defined threshold (e.g. $1.00).",
    "hintsJson": "[\"It has 'Budgets' in the service name.\",\"Found under Billing & Cost Management.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Amazon Inspector",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "AWS Budgets",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "AWS Artifact",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Amazon Macie",
        "isCorrect": false
      }
    ],
    "hints": [
      "It has 'Budgets' in the service name.",
      "Found under Billing & Cost Management."
    ]
  },
  {
    "id": "quiz-88",
    "moduleNumber": 1,
    "topicNumber": 1,
    "topicSlug": "aws-account-creation-root-security-iam",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Amazon EC2 Free Tier Monthly Hour Allocation",
    "prompt": "Under the 12-Months AWS Free Tier, how many combined hours per month of eligible t2.micro or t3.micro EC2 compute instances are included for free?",
    "explanation": "The AWS Free Tier provides 750 hours/month of eligible micro instances. Because a 31-day month has 744 hours, exactly one instance can run 24/7 without incurring compute charges.",
    "hintsJson": "[\"750 hours = 24 hours * 31 days + buffer.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "100 hours per month",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "750 hours per month",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Unlimited hours for all instance types",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "24 hours per month",
        "isCorrect": false
      }
    ],
    "hints": [
      "750 hours = 24 hours * 31 days + buffer."
    ]
  },
  {
    "id": "quiz-89",
    "moduleNumber": 1,
    "topicNumber": 1,
    "topicSlug": "aws-account-creation-root-security-iam",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Unattached Elastic IP Address Billing Rules",
    "prompt": "Under what specific condition does AWS charge an hourly penalty fee for an Elastic IP address?",
    "explanation": "AWS provides one Elastic IP at no charge while it is attached to a running instance. However, if the instance is stopped or terminated and the Elastic IP remains allocated but unattached, AWS charges an hourly penalty (~$0.005/hr) to discourage IPv4 address hoarding.",
    "hintsJson": "[\"Think about IPv4 scarcity.\",\"What happens when an Elastic IP is idle/unattached?\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "When the Elastic IP is attached to a running instance.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "When the Elastic IP is allocated to your account but is NOT attached to a running instance.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Only when the Elastic IP receives more than 1 TB of traffic.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Elastic IPs are always 100% free under all conditions forever.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think about IPv4 scarcity.",
      "What happens when an Elastic IP is idle/unattached?"
    ]
  },
  {
    "id": "quiz-90",
    "moduleNumber": 1,
    "topicNumber": 2,
    "topicSlug": "accidental-charges-cost-explorer-support-refunds",
    "title": "Root Cause Billing Discovery in AWS Cost Explorer",
    "prompt": "You notice an unexpected $50 charge on your account. To isolate exactly which AWS service and which geographic region generated the cost, how should you configure Cost Explorer?",
    "explanation": "In Cost Explorer, setting the date range and grouping first by 'Service' identifies the culprit service (e.g. EC2 or RDS). Then grouping by 'Region' reveals the exact datacenter where resources were launched.",
    "hintsJson": "[\"Use 'Group by' on dimensions: Service and Region.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Set Group By to 'Availability Zone' and delete your IAM account.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Set the date range to the billing period, Group by 'Service' first, then Group by 'Region', and check the 'Usage Type'.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Reboot the local workstation and check bank statements.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Cost Explorer cannot break down costs by service or region.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Use 'Group by' on dimensions: Service and Region."
    ]
  },
  {
    "id": "quiz-91",
    "moduleNumber": 1,
    "topicNumber": 2,
    "topicSlug": "accidental-charges-cost-explorer-support-refunds",
    "title": "Stopped EC2 Instance Lingering EBS Storage Charges",
    "prompt": "Why does an AWS account continue to incur charges for an EC2 instance that has been 'Stopped' in the AWS Console for an entire week?",
    "explanation": "Stopping an instance halts compute CPU/RAM charges. However, the attached Elastic Block Store (EBS) volume retains provisioned disk space on AWS SAN storage hardware and incurs storage charges (~$0.08-$0.10/GB/month) until explicitly deleted.",
    "hintsJson": "[\"Stopping an instance does not delete its disk drive (EBS volume).\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Stopped instances continue to consume CPU and RAM cycles.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Stopping an instance stops hourly compute fees, but the attached EBS volume and snapshots still incur monthly storage costs until deleted.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "AWS charges a $10 penalty fee every time an instance is stopped.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "The Linux kernel continues to ping the internet while powered down.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Stopping an instance does not delete its disk drive (EBS volume)."
    ]
  },
  {
    "id": "quiz-92",
    "moduleNumber": 1,
    "topicNumber": 2,
    "topicSlug": "accidental-charges-cost-explorer-support-refunds",
    "title": "Mandatory Prerequisite Before Requesting a Billing Refund",
    "prompt": "Before submitting an accidental charges refund ticket to AWS Support, what critical action must the account owner perform first?",
    "explanation": "AWS billing specialists verify whether the offending resources have been stopped or terminated before evaluating a refund. If resources are still actively running, billing continues and refund requests are typically declined.",
    "hintsJson": "[\"Billing keeps running until resources are removed.\",\"You must stop or delete the resources first.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Transfer all domains to another registrar.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Stop or terminate all running instances, delete unattached EBS volumes/snapshots, and release Elastic IPs across all regions.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Upgrade to Enterprise Support tier immediately.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Dispute the charge with the credit card bank before contacting AWS.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Billing keeps running until resources are removed.",
      "You must stop or delete the resources first."
    ]
  },
  {
    "id": "quiz-93",
    "moduleNumber": 1,
    "topicNumber": 2,
    "topicSlug": "accidental-charges-cost-explorer-support-refunds",
    "title": "AWS Support Case Category for Accidental Usage Disputes",
    "prompt": "In the AWS Support Center, which Case Type is 100% free of charge for all AWS customers (including those on the $0 Basic Support plan) for disputing charges and requesting refunds?",
    "explanation": "The 'Account and billing support' case type is free for all AWS accounts, allowing customers to communicate with billing specialists via chat or ticket.",
    "hintsJson": "[\"Look for 'Account and billing support'.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Technical support (System impaired)",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Account and billing support",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Infrastructure architecture consulting",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Premium TAM escalation",
        "isCorrect": false
      }
    ],
    "hints": [
      "Look for 'Account and billing support'."
    ]
  },
  {
    "id": "quiz-94",
    "moduleNumber": 1,
    "topicNumber": 2,
    "topicSlug": "accidental-charges-cost-explorer-support-refunds",
    "title": "AWS Global Identity Resolution & Duplicate Free Tier Detection",
    "prompt": "A developer attempts to get a second Free Tier year by creating a new account with a different email address, but re-uses the same mobile number and credit card. Why does AWS mark the new account as 'Free Tier Ineligible'?",
    "explanation": "AWS's anti-fraud system links accounts via a multi-factor identity graph: phone numbers, card BINs, billing addresses, and device fingerprints enforce a strict one Free Tier per unique global individual policy.",
    "hintsJson": "[\"Email is a weak identifier; credit card and phone number create a strong link.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Because Google Chrome shares email passwords with AWS.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "AWS uses an advanced multi-factor identity system linking card details, mobile numbers, and billing addresses to enforce one Free Tier per unique individual.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Free Tier is only available in the United States.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "The developer's debit card has expired.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Email is a weak identifier; credit card and phone number create a strong link."
    ]
  },
  {
    "id": "quiz-95",
    "moduleNumber": 1,
    "topicNumber": 2,
    "topicSlug": "accidental-charges-cost-explorer-support-refunds",
    "title": "Predictable Cost Alternative to EC2 After Free Tier Expiration",
    "prompt": "When an engineer's 12-month EC2 Free Tier expires and they need a low-cost, predictable virtual private server ($3.50/month) with bundled SSD storage and data transfer, which AWS service is purpose-built for this?",
    "explanation": "Amazon Lightsail offers simple, predictable bundled VPS hosting starting at $3.50/month, making it the most cost-effective alternative to raw EC2 after the Free Tier ends.",
    "hintsJson": "[\"Think of AWS's simplified VPS offering.\",\"Starts at $3.50/month.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "AWS Snowball Edge",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Amazon Lightsail",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Amazon EKS Anywhere",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "AWS Outposts Rack",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think of AWS's simplified VPS offering.",
      "Starts at $3.50/month."
    ]
  },
  {
    "id": "quiz-96",
    "moduleNumber": 1,
    "topicNumber": 3,
    "topicSlug": "regions-azs-and-edge-infrastructure",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Physical Definition of an Availability Zone (AZ)",
    "prompt": "What is the physical reality of an AWS Availability Zone (AZ) within a Region?",
    "explanation": "An Availability Zone consists of one or more discrete, physical data center buildings with independent power, cooling, and security, connected to other AZs via ultra-low latency optical fiber.",
    "hintsJson": "[\"An AZ is one or more physical data centers, not just a single server rack.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "An Availability Zone is a software container running in a single server rack.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "An Availability Zone consists of one or more discrete physical data centers with independent power, cooling, and physical networking.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "An Availability Zone is a country border defined by the United Nations.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "An Availability Zone is an edge cache server for video streaming.",
        "isCorrect": false
      }
    ],
    "hints": [
      "An AZ is one or more physical data centers, not just a single server rack."
    ]
  },
  {
    "id": "quiz-97",
    "moduleNumber": 1,
    "topicNumber": 3,
    "topicSlug": "regions-azs-and-edge-infrastructure",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "High Availability Architecture Across Availability Zones",
    "prompt": "Why does deploying application servers across at least two Availability Zones in the same Region provide high availability?",
    "explanation": "Because AZs are physically separated by miles with independent power grids and flood plains, a localized disaster affecting one data center does not impact the surviving AZ.",
    "hintsJson": "[\"Independent failure domains protect against local power/cooling outages.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Because AWS gives a 50% discount for multi-AZ deployments.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Because AZs are physically isolated with independent power and flood plains, allowing workloads to failover automatically if one AZ suffers an outage.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Because instances in different AZs share the exact same physical CPU socket.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Because multi-AZ eliminates the need for any data backups.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Independent failure domains protect against local power/cooling outages."
    ]
  },
  {
    "id": "quiz-98",
    "moduleNumber": 1,
    "topicNumber": 3,
    "topicSlug": "regions-azs-and-edge-infrastructure",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "CloudFront Edge Locations vs AWS Regions",
    "prompt": "What is the primary architectural purpose of AWS Edge Locations compared to AWS Regions?",
    "explanation": "Edge Locations are hundreds of globally distributed Points of Presence (PoPs) that cache static and dynamic web content (via CloudFront) and route DNS queries (Route 53) near end users to minimize latency.",
    "hintsJson": "[\"Think of Content Delivery Networks (CDN) and caching.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Edge Locations are full data centers where you deploy heavy relational databases.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Edge Locations are points of presence worldwide that cache content close to end users (CloudFront) and route DNS (Route 53) with minimal latency.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Edge Locations are used exclusively for bitcoin mining by AWS.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Edge Locations are physical warehouses where AWS stores magnetic tape backups.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think of Content Delivery Networks (CDN) and caching."
    ]
  },
  {
    "id": "quiz-99",
    "moduleNumber": 1,
    "topicNumber": 3,
    "topicSlug": "regions-azs-and-edge-infrastructure",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "AWS Local Zones Target Use Case",
    "prompt": "When should an enterprise architect choose an AWS Local Zone rather than a standard AWS Region?",
    "explanation": "AWS Local Zones place compute, storage, and databases close to large metropolitan population centers that lack a full AWS Region, delivering single-digit millisecond latency for local real-time applications.",
    "hintsJson": "[\"Single-digit millisecond latency to major metropolitan centers.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "When the application requires sub-10ms latency for users in a major city that does not have an AWS Region.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "When looking for the cheapest possible storage tier for cold archive data.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "When deploying global multi-region Active Directory domain controllers.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "When the account has exhausted its default EC2 vCPU limits.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Single-digit millisecond latency to major metropolitan centers."
    ]
  },
  {
    "id": "quiz-100",
    "moduleNumber": 1,
    "topicNumber": 3,
    "topicSlug": "regions-azs-and-edge-infrastructure",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "AWS Wavelength 5G Edge Integration",
    "prompt": "What unique technical capability distinguishes AWS Wavelength from standard AWS Regions?",
    "explanation": "AWS Wavelength embeds AWS compute and storage hardware directly inside telecommunications 5G networks, enabling mobile application traffic to reach cloud compute without leaving the cellular network.",
    "hintsJson": "[\"5G carrier networks and ultra-low mobile device latency.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It allows running mainframe COBOL applications in the cloud.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "It embeds AWS compute directly inside telecommunication provider 5G networks to deliver ultra-low latency (< 5ms) to mobile devices.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "It replaces all fiber optic cables with satellite microwave links.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It provides free unlimited data transfer to the public internet.",
        "isCorrect": false
      }
    ],
    "hints": [
      "5G carrier networks and ultra-low mobile device latency."
    ]
  },
  {
    "id": "quiz-101",
    "moduleNumber": 3,
    "topicNumber": 1,
    "topicSlug": "vpc-subnetting-gateways-packet-flow",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Default VPC Initial Preconfiguration",
    "prompt": "Which of the following components is automatically preconfigured and attached when AWS creates a Default VPC in your account?",
    "explanation": "A Default VPC comes preconfigured with an attached Internet Gateway (IGW), subnets in each AZ, and route tables directing 0.0.0.0/0 to the IGW.",
    "hintsJson": "[\"It connects directly to the internet out of the box.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "A Site-to-Site IPsec VPN connection",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "An attached Internet Gateway (IGW) and public subnets with default internet routes",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "An AWS Transit Gateway hub",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "A dedicated hardware firewall appliance",
        "isCorrect": false
      }
    ],
    "hints": [
      "It connects directly to the internet out of the box."
    ]
  },
  {
    "id": "quiz-102",
    "moduleNumber": 3,
    "topicNumber": 1,
    "topicSlug": "vpc-subnetting-gateways-packet-flow",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "AWS Reserved IP Addresses in a Subnet",
    "prompt": "In an AWS VPC subnet with CIDR block 192.168.10.0/24 (256 total IP addresses), exactly how many usable IP addresses can be assigned to EC2 instances, and why?",
    "explanation": "AWS strictly reserves 5 IP addresses in every subnet (.0 network, .1 router, .2 DNS, .3 future, .255 broadcast). Therefore, 256 - 5 = 251 usable host IPs.",
    "hintsJson": "[\"256 total addresses minus 5 AWS reserved addresses.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "256 usable IPs (all addresses are available)",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "254 usable IPs (standard 2 IPs reserved for network and broadcast)",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "251 usable IPs (AWS reserves 5 specific IPs in every subnet)",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "128 usable IPs (AWS reserves half the subnet for redundancy)",
        "isCorrect": false
      }
    ],
    "hints": [
      "256 total addresses minus 5 AWS reserved addresses."
    ]
  },
  {
    "id": "quiz-103",
    "moduleNumber": 3,
    "topicNumber": 1,
    "topicSlug": "vpc-subnetting-gateways-packet-flow",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Subnet Placement within Availability Zones",
    "prompt": "Can a single AWS VPC Subnet span across multiple physical Availability Zones?",
    "explanation": "No. In AWS architecture, an individual Subnet resides strictly within exactly one single Availability Zone. To achieve multi-AZ redundancy, you must create separate subnets in each AZ.",
    "hintsJson": "[\"A subnet is bound to a single AZ.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Yes, a subnet automatically spans all AZs in the Region.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "No, a Subnet resides strictly within a single Availability Zone.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Only private subnets can span across multiple AZs.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Only if Transit Gateway is enabled.",
        "isCorrect": false
      }
    ],
    "hints": [
      "A subnet is bound to a single AZ."
    ]
  },
  {
    "id": "quiz-104",
    "moduleNumber": 3,
    "topicNumber": 1,
    "topicSlug": "vpc-subnetting-gateways-packet-flow",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Public Subnet Defining Characteristics",
    "prompt": "What specific architectural configuration makes a subnet a 'Public Subnet' in an Amazon VPC?",
    "explanation": "A subnet is defined as public if its associated Route Table has a default route (0.0.0.0/0) directing outbound traffic to an attached Internet Gateway (IGW).",
    "hintsJson": "[\"Look at the Route Table target (Internet Gateway).\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "The subnet is tagged with 'Environment=Public'.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Its route table contains a default route (0.0.0.0/0) targeting an attached Internet Gateway (IGW).",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "The subnet uses 192.168.0.0/16 rather than 10.0.0.0/16.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It has a NAT Gateway deployed inside it.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Look at the Route Table target (Internet Gateway)."
    ]
  },
  {
    "id": "quiz-105",
    "moduleNumber": 3,
    "topicNumber": 1,
    "topicSlug": "vpc-subnetting-gateways-packet-flow",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Egress-Only Internet Gateway Purpose",
    "prompt": "What is the primary function of an Egress-Only Internet Gateway in an Amazon VPC?",
    "explanation": "An Egress-Only Internet Gateway provides stateful outbound-only internet connectivity for IPv6 traffic from instances in private subnets, while completely blocking incoming connections from the internet.",
    "hintsJson": "[\"Think of stateful outbound-only connectivity for IPv6.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It performs 1:1 NAT translation for IPv4 traffic.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "It provides stateful egress-only access for IPv6 traffic to the internet while blocking inbound internet traffic.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "It connects VPCs to on-premises IPsec VPN routers.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It speeds up S3 uploads by 500%.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think of stateful outbound-only connectivity for IPv6."
    ]
  },
  {
    "id": "quiz-106",
    "moduleNumber": 3,
    "topicNumber": 1,
    "topicSlug": "vpc-subnetting-gateways-packet-flow",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Bastion Host Operational Role",
    "prompt": "What is the purpose of a Bastion Host (jump server) in cloud network architecture?",
    "explanation": "A Bastion Host is a hardened EC2 instance situated in a public subnet that administrators connect to via SSH or RDP to bridge into backend instances residing in private subnets.",
    "hintsJson": "[\"A secure bridge/jump server into private subnets.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It stores user session cookies for relational databases.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "It sits in a public subnet and acts as a secure jump bridge to access private subnet instances via SSH or RDP.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "It caches DNS queries for Route 53.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It replaces the need for an Internet Gateway.",
        "isCorrect": false
      }
    ],
    "hints": [
      "A secure bridge/jump server into private subnets."
    ]
  },
  {
    "id": "quiz-107",
    "moduleNumber": 3,
    "topicNumber": 2,
    "topicSlug": "vpc-security-groups-nacls-firewall-flow-logs",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Security Groups vs Network ACLs Evaluation Layer",
    "prompt": "At which architectural boundary do Security Groups operate compared to Network ACLs (NACLs)?",
    "explanation": "Security Groups operate at the virtual network interface (ENI / instance) level, whereas Network ACLs operate at the subnet boundary.",
    "hintsJson": "[\"ENI/instance level vs Subnet level.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Security Groups operate at the subnet level; NACLs operate at the instance level.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Security Groups operate at the virtual network interface (ENI/instance) level; NACLs operate at the subnet boundary.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Both operate exclusively at the Internet Gateway.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Security Groups operate at DNS Layer 7; NACLs operate at physical Layer 1.",
        "isCorrect": false
      }
    ],
    "hints": [
      "ENI/instance level vs Subnet level."
    ]
  },
  {
    "id": "quiz-108",
    "moduleNumber": 3,
    "topicNumber": 2,
    "topicSlug": "vpc-security-groups-nacls-firewall-flow-logs",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Explicit IP Deny Capability in VPC Firewalls",
    "prompt": "A security analyst discovers that a malicious IP address (203.0.113.88) is attempting an SSH brute-force attack. Which VPC firewall can explicitly DENY traffic from this single IP address?",
    "explanation": "Security Groups only support ALLOW rules (implicit deny all). To explicitly DENY a specific IP address while allowing others, you must use a Network ACL (NACL) with an explicit DENY rule placed at a lower rule number.",
    "hintsJson": "[\"Security Groups do NOT support explicit DENY rules; NACLs do.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Security Groups, by adding an inbound DENY rule.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Network ACLs (NACLs), by inserting an explicit DENY rule with a low rule number.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Internet Gateway route tables.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "DHCP Options Sets.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Security Groups do NOT support explicit DENY rules; NACLs do."
    ]
  },
  {
    "id": "quiz-109",
    "moduleNumber": 3,
    "topicNumber": 2,
    "topicSlug": "vpc-security-groups-nacls-firewall-flow-logs",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Stateless NACL Ephemeral Return Port Requirement",
    "prompt": "An engineer creates a custom NACL allowing inbound TCP port 80, but web clients report timeouts. What outbound rule is mandatory in a stateless NACL to allow web responses to return to client browsers?",
    "explanation": "Because NACLs are stateless, outbound responses do NOT return on port 80; they return to the client's temporary ephemeral port. An outbound rule allowing TCP ports 1024-65535 to 0.0.0.0/0 is mandatory.",
    "hintsJson": "[\"Clients use temporary ephemeral ports between 1024 and 65535.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "ALLOW Outbound UDP port 53",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "ALLOW Outbound TCP ports 1024–65535 (Ephemeral Port Range) to 0.0.0.0/0",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "ALLOW Outbound ICMP ping to all hosts",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "No outbound rule is needed because NACLs are stateful.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Clients use temporary ephemeral ports between 1024 and 65535."
    ]
  },
  {
    "id": "quiz-110",
    "moduleNumber": 3,
    "topicNumber": 2,
    "topicSlug": "vpc-security-groups-nacls-firewall-flow-logs",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "VPC Flow Logs Performance Impact",
    "prompt": "How does enabling VPC Flow Logs affect the network throughput, packet latency, and CPU utilization of EC2 instances in that VPC?",
    "explanation": "Flow log data is collected out-of-band at the hypervisor layer outside the path of network traffic. It has zero impact on network throughput, latency, or instance CPU utilization.",
    "hintsJson": "[\"Flow logs are captured out-of-band outside the traffic path.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It reduces network throughput by 25% due to deep packet payload hashing.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "It has zero impact on throughput or latency because data is collected out-of-band outside the path of traffic.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "It introduces 50ms of latency per TCP packet.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It consumes 2 vCPUs on every running EC2 instance.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Flow logs are captured out-of-band outside the traffic path."
    ]
  },
  {
    "id": "quiz-111",
    "moduleNumber": 3,
    "topicNumber": 2,
    "topicSlug": "vpc-security-groups-nacls-firewall-flow-logs",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Route 53 DNS Firewall Fail-Closed Mode",
    "prompt": "What does configuring Route 53 DNS Firewall in 'Fail-Closed' mode ensure during an internal firewall service disruption?",
    "explanation": "Fail-Closed mode ensures that if Route 53 Resolver does not receive an allow reply from DNS Firewall, it blocks the query. This approach strictly favors security over availability to prevent data exfiltration.",
    "hintsJson": "[\"It blocks queries if it does not receive a reply, favoring security.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It allows all DNS queries through automatically to maintain uptime.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "It blocks any DNS query for which it doesn't receive a reply from DNS Firewall, favoring security over availability.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "It restarts all EC2 instances in the VPC.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It deletes the VPC's Internet Gateway.",
        "isCorrect": false
      }
    ],
    "hints": [
      "It blocks queries if it does not receive a reply, favoring security."
    ]
  },
  {
    "id": "quiz-112",
    "moduleNumber": 3,
    "topicNumber": 3,
    "topicSlug": "vpc-peering-transit-gateway-endpoints-vpn",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "VPC Gateway Endpoint Zero-Cost Advantage",
    "prompt": "An organization transfers 50 TB/month of database backups from private EC2 subnets to Amazon S3. Which networking solution routes this traffic entirely within the AWS network at $0.00 cost, completely bypassing NAT Gateway data fees ($0.045/GB)?",
    "explanation": "VPC Gateway Endpoints for Amazon S3 and DynamoDB are 100% free of charge. Traffic routes directly over the AWS private SDN without incurring NAT Gateway hourly or data processing fees.",
    "hintsJson": "[\"Targeted route table endpoint for S3 and DynamoDB.\",\"It is 100% free.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "An AWS Transit Gateway attachment",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "A VPC Gateway Endpoint for Amazon S3",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "A dual-tunnel Site-to-Site IPsec VPN",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "An Amazon CloudFront distribution with Origin Shield",
        "isCorrect": false
      }
    ],
    "hints": [
      "Targeted route table endpoint for S3 and DynamoDB.",
      "It is 100% free."
    ]
  },
  {
    "id": "quiz-113",
    "moduleNumber": 3,
    "topicNumber": 3,
    "topicSlug": "vpc-peering-transit-gateway-endpoints-vpn",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Non-Transitive Rule of VPC Peering",
    "prompt": "VPC A is peered with VPC B (pcx-12), and VPC B is peered with VPC C (pcx-23). Can an EC2 instance in VPC A directly communicate with an instance in VPC C through VPC B?",
    "explanation": "No. AWS VPC Peering is strictly non-transitive. Traffic cannot hop across an intermediate VPC. VPC A must establish a direct peering connection with VPC C or use AWS Transit Gateway.",
    "hintsJson": "[\"VPC Peering does NOT support transitive routing.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Yes, as long as BGP dynamic routing is enabled in VPC B.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "No, VPC Peering is strictly non-transitive and does not allow intermediate routing through VPC B.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Yes, because all VPCs in the same account share a single routing domain.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Only if both VPCs use IPv6 addresses.",
        "isCorrect": false
      }
    ],
    "hints": [
      "VPC Peering does NOT support transitive routing."
    ]
  },
  {
    "id": "quiz-114",
    "moduleNumber": 3,
    "topicNumber": 3,
    "topicSlug": "vpc-peering-transit-gateway-endpoints-vpn",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "AWS Transit Gateway Hub-and-Spoke Simplification",
    "prompt": "An enterprise has 20 VPCs across multiple AWS accounts that all require interconnectivity. How many network connections are required using AWS Transit Gateway compared to full-mesh VPC Peering?",
    "explanation": "Full-mesh VPC peering requires N*(N-1)/2 = 20*19/2 = 190 peering connections. AWS Transit Gateway acts as a central hub where each VPC makes exactly 1 attachment (20 total attachments).",
    "hintsJson": "[\"Compare 1 attachment per VPC (20) with N*(N-1)/2 mesh (190).\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Transit Gateway requires 190 attachments; VPC Peering requires 20.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Transit Gateway requires 20 attachments (1 per VPC); full-mesh VPC Peering requires 190 connections.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Both require exactly 400 connections.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Transit Gateway is only supported within a single AWS account.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Compare 1 attachment per VPC (20) with N*(N-1)/2 mesh (190)."
    ]
  },
  {
    "id": "quiz-115",
    "moduleNumber": 3,
    "topicNumber": 3,
    "topicSlug": "vpc-peering-transit-gateway-endpoints-vpn",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Site-to-Site VPN Dual-Tunnel Architecture",
    "prompt": "Why does an AWS Site-to-Site VPN connection provision two separate IPsec VPN tunnels by default?",
    "explanation": "A VPN connection consists of two tunnels to provide high availability. If AWS performs routine maintenance on one device, traffic automatically fails over to the second tunnel with zero downtime.",
    "hintsJson": "[\"Think of automatic failover and maintenance redundancy.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "One tunnel is for IPv4 and the second tunnel is for IPv6.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Two tunnels provide automatic failover and high availability if one tunnel suffers a device failure or maintenance outage.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "One tunnel is for downloads and the second tunnel is for uploads.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "The second tunnel is reserved for billing metadata.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think of automatic failover and maintenance redundancy."
    ]
  },
  {
    "id": "quiz-116",
    "moduleNumber": 3,
    "topicNumber": 3,
    "topicSlug": "vpc-peering-transit-gateway-endpoints-vpn",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "AWS Traffic Mirroring Core Components",
    "prompt": "What are the three core configuration entities required to set up an AWS Traffic Mirroring session for out-of-band network packet inspection?",
    "explanation": "Traffic Mirroring requires: (1) Target (destination ENI or NLB), (2) Filter (rules defining what traffic is copied), and (3) Session (binds source ENI to target using the filter).",
    "hintsJson": "[\"From the PDF: Target, Filter, and Session.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Ingress, Egress, and Route Table",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Target (destination), Filter (packet rules), and Session (entity binding source to target)",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "NAT Gateway, Bastion Host, and Customer Gateway",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "VPC Peering, Transit Gateway, and Direct Connect",
        "isCorrect": false
      }
    ],
    "hints": [
      "From the PDF: Target, Filter, and Session."
    ]
  },
  {
    "id": "quiz-117",
    "moduleNumber": 21,
    "topicNumber": 1,
    "topicSlug": "angular-core-components-lifecycle-databinding",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Standalone Components Architecture",
    "prompt": "In Angular 15+, what is the primary architectural advantage of standalone components over traditional NgModule-based components?",
    "explanation": "Standalone components specify their dependencies directly in their @Component metadata 'imports' array, simplifying modularity and enabling superior tree-shaking without requiring intermediate NgModules.",
    "hintsJson": "[\"Think about eliminating NgModule boilerplate and improving tree-shaking.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "They run completely outside Zone.js by default without any compiler intervention.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "They declare dependencies directly in their imports array, eliminating NgModule boilerplate and enabling fine-grained tree-shaking.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "They can only be rendered inside Web Workers rather than the browser main thread.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "They convert all TypeScript code into WebAssembly binary at compile time.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think about eliminating NgModule boilerplate and improving tree-shaking."
    ]
  },
  {
    "id": "quiz-118",
    "moduleNumber": 21,
    "topicNumber": 1,
    "topicSlug": "angular-core-components-lifecycle-databinding",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "ViewEncapsulation.Emulated Scoping Mechanism",
    "prompt": "How does Angular's default ViewEncapsulation.Emulated prevent component styles from leaking into the global document?",
    "explanation": "The Ivy compiler transforms CSS selectors by appending unique host and content attributes (e.g. _nghost-ng-c12 and _ngcontent-ng-c12) to DOM elements and rules without using native browser Shadow DOM.",
    "hintsJson": "[\"Look for compiler-generated unique attributes.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It attaches a native shadowRoot to every component custom element.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "It transforms CSS rules by appending generated unique attributes (_ngcontent-ng-c* and _nghost-ng-c*) to elements and selectors.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "It converts all CSS into inline style attributes on every DOM element.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It executes a JavaScript post-processor that deletes all global CSS after rendering.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Look for compiler-generated unique attributes."
    ]
  },
  {
    "id": "quiz-119",
    "moduleNumber": 21,
    "topicNumber": 1,
    "topicSlug": "angular-core-components-lifecycle-databinding",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Component Lifecycle Execution Order",
    "prompt": "When an Angular component with an @Input() property is rendered for the first time, in which exact order do constructor, ngOnInit, and ngOnChanges execute?",
    "explanation": "constructor executes first during class instantiation, followed by ngOnChanges when @Input properties are first resolved, and finally ngOnInit executes when component inputs are initialized.",
    "hintsJson": "[\"Inputs are resolved before ngOnInit.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "constructor -> ngOnInit -> ngOnChanges",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "constructor -> ngOnChanges -> ngOnInit",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "ngOnInit -> constructor -> ngOnChanges",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "ngOnChanges -> constructor -> ngOnInit",
        "isCorrect": false
      }
    ],
    "hints": [
      "Inputs are resolved before ngOnInit."
    ]
  },
  {
    "id": "quiz-120",
    "moduleNumber": 21,
    "topicNumber": 2,
    "topicSlug": "angular-rxjs-services-dependency-injection",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "RxJS Higher-Order Mapping Operators",
    "prompt": "Which RxJS flattening operator should be used for a search typeahead input where any previous in-flight HTTP request must be cancelled immediately when the user types a new character?",
    "explanation": "switchMap unsubscribes from and cancels any previous active inner Observable when a new emission arrives from the source stream, making it ideal for search auto-completion.",
    "hintsJson": "[\"It 'switches' to the newest stream and drops previous ones.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "concatMap (buffers and processes in strict sequential order)",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "mergeMap (executes all requests concurrently without cancellation)",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "switchMap (cancels previous pending inner request when new value emits)",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "exhaustMap (ignores all new emissions while inner request is active)",
        "isCorrect": false
      }
    ],
    "hints": [
      "It 'switches' to the newest stream and drops previous ones."
    ]
  },
  {
    "id": "quiz-121",
    "moduleNumber": 21,
    "topicNumber": 2,
    "topicSlug": "angular-rxjs-services-dependency-injection",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "BehaviorSubject vs ReplaySubject",
    "prompt": "What is the key functional difference between a BehaviorSubject and a ReplaySubject(1) in Angular reactive state management?",
    "explanation": "A BehaviorSubject requires an initial default value at instantiation and stores only the current latest value. A ReplaySubject does not require an initial value and will replay its buffered emissions to new subscribers.",
    "hintsJson": "[\"Which one requires a seed value in its constructor?\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "BehaviorSubject requires an initial seed value, whereas ReplaySubject(1) can be instantiated without an initial value.",
        "isCorrect": true
      },
      {
        "optionKey": "B",
        "optionText": "BehaviorSubject never emits to late subscribers, while ReplaySubject does.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "ReplaySubject cannot be completed or thrown into an error state.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "BehaviorSubject is only compatible with Angular Signals, not RxJS Observables.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Which one requires a seed value in its constructor?"
    ]
  },
  {
    "id": "quiz-122",
    "moduleNumber": 21,
    "topicNumber": 3,
    "topicSlug": "angular-routing-forms-change-detection-signals",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "ChangeDetectionStrategy.OnPush Mechanics",
    "prompt": "Under ChangeDetectionStrategy.OnPush, which of the following actions will NOT automatically cause Angular to check the component's template?",
    "explanation": "Mutating a property of an existing object passed as an @Input (e.g. user.name = 'Bob') does not change the object reference. OnPush checks inputs using strict equality (===), so the component is skipped.",
    "hintsJson": "[\"OnPush relies on reference comparison (===).\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "A DOM event handler (such as (click) or (input)) inside the component template fires.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "An Observable bound in the template with the async pipe emits a new value.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Mutating a nested property of an object passed via @Input without creating a new object reference.",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "A new object reference is passed to an @Input property from the parent component.",
        "isCorrect": false
      }
    ],
    "hints": [
      "OnPush relies on reference comparison (===)."
    ]
  },
  {
    "id": "quiz-123",
    "moduleNumber": 21,
    "topicNumber": 3,
    "topicSlug": "angular-routing-forms-change-detection-signals",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Angular Signals Reactivity Model",
    "prompt": "How do Angular Signals (signal, computed, effect) differ fundamentally from RxJS Observables for local component reactivity?",
    "explanation": "Signals are synchronous, glitch-free value holders that track dependencies automatically and notify the template directly without requiring Zone.js or manual subscription teardown.",
    "hintsJson": "[\"Signals are synchronous and track dependencies automatically.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Signals are asynchronous streams that require explicit .subscribe() and .unsubscribe() calls.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Signals are synchronous, glitch-free reactive getters that automatically track dependencies and do not require Zone.js.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Signals can only store primitive strings and numbers, never objects or arrays.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Signals replace HTTP client entirely by compiling into WebSockets.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Signals are synchronous and track dependencies automatically."
    ]
  },
  {
    "id": "quiz-124",
    "moduleNumber": 22,
    "topicNumber": 1,
    "topicSlug": "nodejs-event-loop-libuv-async-programming",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "libuv Event Loop Microtask Precedence",
    "prompt": "In the Node.js event loop, when are process.nextTick callbacks processed relative to Promise.then microtasks?",
    "explanation": "process.nextTick queue is processed immediately after the current operation finishes and runs before the standard Promise microtask queue at every tick boundary.",
    "hintsJson": "[\"process.nextTick takes highest priority among microtasks.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "process.nextTick runs after all Promise.then microtasks and timer callbacks.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "process.nextTick runs before Promise.then microtasks on every transition between event loop phases.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "process.nextTick only executes during the Poll phase of the event loop.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "process.nextTick and Promise.then run in round-robin FIFO order with equal precedence.",
        "isCorrect": false
      }
    ],
    "hints": [
      "process.nextTick takes highest priority among microtasks."
    ]
  },
  {
    "id": "quiz-125",
    "moduleNumber": 22,
    "topicNumber": 1,
    "topicSlug": "nodejs-event-loop-libuv-async-programming",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "libuv Default Thread Pool Size",
    "prompt": "What is the default thread pool size allocated by libuv in Node.js for asynchronous I/O and crypto operations?",
    "explanation": "libuv initializes a thread pool with 4 worker threads by default, which can be modified via the UV_THREADPOOL_SIZE environment variable up to 1024.",
    "hintsJson": "[\"The default is a small single-digit power of 2.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "1 thread (matching the V8 single thread)",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "4 threads",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "16 threads",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "64 threads",
        "isCorrect": false
      }
    ],
    "hints": [
      "The default is a small single-digit power of 2."
    ]
  },
  {
    "id": "quiz-126",
    "moduleNumber": 22,
    "topicNumber": 2,
    "topicSlug": "nodejs-streams-buffer-file-handling",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Stream Backpressure Mechanics",
    "prompt": "In Node.js writable streams, how does a consumer indicate backpressure to a fast readable producer, and how does the producer resume writing?",
    "explanation": "writable.write(chunk) returns false when internal highWaterMark buffer is exceeded. The producer pauses, and the writable emits the 'drain' event when the buffer has emptied, signaling the producer to resume.",
    "hintsJson": "[\"write() returns a boolean; what event signifies buffer empty?\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "writable throws an 'EBACKPRESSURE' exception; producer catches and sleeps for 100ms.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "writable.write() returns false when buffer fills; producer waits for the 'drain' event before writing more.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "writable drops all incoming chunks silently until CPU load falls below 50%.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Node.js switches automatically from TCP to UDP mode.",
        "isCorrect": false
      }
    ],
    "hints": [
      "write() returns a boolean; what event signifies buffer empty?"
    ]
  },
  {
    "id": "quiz-127",
    "moduleNumber": 22,
    "topicNumber": 2,
    "topicSlug": "nodejs-streams-buffer-file-handling",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "stream/promises.pipeline vs readable.pipe",
    "prompt": "Why is stream/promises.pipeline() strongly preferred over readable.pipe(writable) in production Node.js applications?",
    "explanation": "pipeline() automatically forwards errors, destroys intermediate streams, and closes file descriptors if an error occurs mid-stream, whereas readable.pipe() leaves streams open and causes resource leaks.",
    "hintsJson": "[\"Think about error propagation and cleanup on failure.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "pipeline() runs in worker threads, whereas pipe() is synchronous.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "pipeline() properly forwards errors, cleans up and destroys all streams on failure, preventing memory/file descriptor leaks.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "readable.pipe() was deprecated and removed from Node.js in version 18.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "pipeline() compresses all data using gzip automatically.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Think about error propagation and cleanup on failure."
    ]
  },
  {
    "id": "quiz-128",
    "moduleNumber": 22,
    "topicNumber": 3,
    "topicSlug": "express-middleware-security-performance-caching",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "Express Centralized Error Middleware Signature",
    "prompt": "How does Express.js distinguish a centralized error-handling middleware from a standard request middleware?",
    "explanation": "Express inspects the function's arity (Function.length). A middleware declaring exactly 4 parameters (err, req, res, next) is recognized as an error handler.",
    "hintsJson": "[\"How many parameters does the callback function take?\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "By registering it with app.useError() instead of app.use().",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "By the function declaring exactly 4 parameters: (err, req, res, next).",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "By marking the function with the @ErrorHandler TypeScript decorator.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "By returning a Promise.reject() from the function body.",
        "isCorrect": false
      }
    ],
    "hints": [
      "How many parameters does the callback function take?"
    ]
  },
  {
    "id": "quiz-129",
    "moduleNumber": 23,
    "topicNumber": 1,
    "topicSlug": "rest-api-design-http-protocol-idempotency",
    "type": "MCQ",
    "difficulty": "Beginner",
    "title": "HTTP PUT vs PATCH Semantics",
    "prompt": "According to HTTP specifications (RFC 7231 and RFC 7396), what is the difference between PUT and PATCH methods?",
    "explanation": "PUT is an idempotent full replacement of the entire resource representation. PATCH is used for partial modifications of resource attributes.",
    "hintsJson": "[\"Full replacement vs partial update.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "PUT creates resources; PATCH only deletes resources.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "PUT replaces the entire resource state idempotently; PATCH applies partial modifications.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "PUT can only be called from browsers; PATCH is reserved for curl and Postman.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "There is no difference; they are exact aliases in modern HTTP servers.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Full replacement vs partial update."
    ]
  },
  {
    "id": "quiz-130",
    "moduleNumber": 23,
    "topicNumber": 1,
    "topicSlug": "rest-api-design-http-protocol-idempotency",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "HTTP Method Idempotency Classifications",
    "prompt": "Which of the following sets of HTTP methods are strictly guaranteed to be IDEMPOTENT by specification?",
    "explanation": "GET, HEAD, PUT, DELETE, and OPTIONS are idempotent because making multiple identical requests has the same intended effect on server state as making a single request.",
    "hintsJson": "[\"Can you safely repeat a DELETE or PUT without changing the resulting state?\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "POST, PATCH, CONNECT",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "GET, HEAD, PUT, DELETE, OPTIONS",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "POST, PUT, DELETE",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Only GET and HEAD; all modifying methods are non-idempotent.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Can you safely repeat a DELETE or PUT without changing the resulting state?"
    ]
  },
  {
    "id": "quiz-131",
    "moduleNumber": 23,
    "topicNumber": 2,
    "topicSlug": "api-security-jwt-rbac-rate-limiting-cors",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Refresh Token Rotation (RTR) Defense",
    "prompt": "In modern OAuth2 / JWT architectures, how does Refresh Token Rotation (RTR) protect against token theft?",
    "explanation": "Every time a refresh token is exchanged, a new refresh token is issued and the old one invalidated. If an attacker presents an already-used refresh token, the server detects token reuse and invalidates the entire token family.",
    "hintsJson": "[\"What happens when an old already-used token is presented again?\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It encrypts the token with the client's MAC address so it cannot run elsewhere.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Each refresh token can only be used once; presenting an already-used token triggers reuse detection and revokes the whole token family.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "It rotates the RSA private key on every single HTTP request.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It disables HTTPS and relies solely on base64 encoding.",
        "isCorrect": false
      }
    ],
    "hints": [
      "What happens when an old already-used token is presented again?"
    ]
  },
  {
    "id": "quiz-132",
    "moduleNumber": 23,
    "topicNumber": 2,
    "topicSlug": "api-security-jwt-rbac-rate-limiting-cors",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "CORS Preflight OPTIONS Trigger",
    "prompt": "Which of the following HTTP requests will trigger a browser CORS Preflight (OPTIONS) request prior to sending the actual request?",
    "explanation": "A preflight OPTIONS request is triggered whenever the request uses non-simple HTTP methods (e.g. PUT, DELETE, PATCH) or non-simple headers (e.g. Authorization, Content-Type: application/json).",
    "hintsJson": "[\"Content-Type: application/json triggers preflight.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "A GET request with no custom headers.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "A POST request with Content-Type: application/x-www-form-urlencoded.",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "A POST request with Content-Type: application/json and an Authorization header.",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "A HEAD request with standard Accept header.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Content-Type: application/json triggers preflight."
    ]
  },
  {
    "id": "quiz-133",
    "moduleNumber": 23,
    "topicNumber": 3,
    "topicSlug": "api-validation-pagination-filtering-error-handling",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "Keyset (Cursor) vs OFFSET Pagination",
    "prompt": "Why is Keyset (Cursor-based) pagination dramatically more scalable than OFFSET/LIMIT pagination for tables with millions of rows?",
    "explanation": "OFFSET requires the database engine to scan and discard N rows (O(N) seek penalty). Cursor pagination uses indexed comparison (WHERE id > cursor) which resolves in O(log N) time via B-Tree index seek.",
    "hintsJson": "[\"Consider how the database locates row 1,000,000.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Cursor pagination downloads all database rows into Node.js memory upfront.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Cursor pagination uses B-tree indexed seeks (WHERE id > :cursor) in O(log N) time, avoiding the O(N) scan-and-discard overhead of OFFSET.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "OFFSET pagination is not supported by SQL databases.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Cursor pagination automatically compresses the response into Brotli format.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Consider how the database locates row 1,000,000."
    ]
  },
  {
    "id": "quiz-134",
    "moduleNumber": 24,
    "topicNumber": 1,
    "topicSlug": "sql-nosql-schema-modeling-indexing",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "B-Tree Composite Index Leftmost Prefix Rule",
    "prompt": "If a database table has a composite B-Tree index on (tenant_id, status, created_at), which of the following WHERE queries CANNOT use this index effectively?",
    "explanation": "Under the Leftmost Prefix rule, a B-tree composite index can only be navigated starting from its leading column(s). A query filtering only on 'status' skips the leading 'tenant_id' column and cannot use the index.",
    "hintsJson": "[\"The index tree is ordered by tenant_id first.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "WHERE tenant_id = 'org_1' AND status = 'ACTIVE'",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "WHERE tenant_id = 'org_1'",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "WHERE status = 'ACTIVE' AND created_at > '2025-01-01'",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "WHERE tenant_id = 'org_1' AND status = 'ACTIVE' AND created_at > '2025-01-01'",
        "isCorrect": false
      }
    ],
    "hints": [
      "The index tree is ordered by tenant_id first."
    ]
  },
  {
    "id": "quiz-135",
    "moduleNumber": 24,
    "topicNumber": 1,
    "topicSlug": "sql-nosql-schema-modeling-indexing",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "ACID Isolation Levels & Anomalies",
    "prompt": "Which database transaction isolation level prevents Dirty Reads and Non-Repeatable Reads, but may still permit Phantom Reads in standard ANSI SQL?",
    "explanation": "Repeatable Read guarantees that data read once during a transaction will not change if read again (preventing Dirty Reads and Non-Repeatable Reads), but new rows inserted by concurrent transactions may appear (Phantom Reads).",
    "hintsJson": "[\"Repeatable Read prevents non-repeatable reads.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Read Uncommitted",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Read Committed",
        "isCorrect": false
      },
      {
        "optionKey": "C",
        "optionText": "Repeatable Read",
        "isCorrect": true
      },
      {
        "optionKey": "D",
        "optionText": "Serializable",
        "isCorrect": false
      }
    ],
    "hints": [
      "Repeatable Read prevents non-repeatable reads."
    ]
  },
  {
    "id": "quiz-136",
    "moduleNumber": 24,
    "topicNumber": 2,
    "topicSlug": "query-optimization-execution-plans-caching",
    "type": "MCQ",
    "difficulty": "Intermediate",
    "title": "The N+1 Query Problem",
    "prompt": "In full-stack backend development, what constitutes the classic 'N+1 Query Problem' when fetching a list of 50 users and their profile details?",
    "explanation": "The application executes 1 initial query to fetch the 50 parent records, followed by N (50) separate queries in a loop to fetch each child relation, causing 51 total database queries instead of 1 eager JOIN query.",
    "hintsJson": "[\"1 initial query + N queries in a loop.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "Running a query that takes N+1 seconds to complete.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "Executing 1 query to retrieve N records, followed by N separate queries to fetch related child entities instead of eager loading.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "Creating N+1 indexes on a single database table.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "Attempting to insert N+1 columns into a table with only N defined columns.",
        "isCorrect": false
      }
    ],
    "hints": [
      "1 initial query + N queries in a loop."
    ]
  },
  {
    "id": "quiz-137",
    "moduleNumber": 24,
    "topicNumber": 2,
    "topicSlug": "query-optimization-execution-plans-caching",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Cache-Aside (Lazy Loading) Pattern",
    "prompt": "In high-throughput microservices, how does the Cache-Aside pattern handle read requests when an item is requested?",
    "explanation": "The application first checks the cache. On a cache hit, it returns the data immediately. On a cache miss, it reads the data from the database, writes it to the cache with a TTL, and returns it to the client.",
    "hintsJson": "[\"Check cache first; on miss fetch from DB and write to cache.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "The database automatically pushes all updates to the cache before committing transactions.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "The application checks the cache; on a miss, it queries the DB, writes the result to cache with TTL, and returns it.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "The cache intercepts all network packets at the NIC hardware level.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "All reads bypass the cache completely and only writes touch Redis.",
        "isCorrect": false
      }
    ],
    "hints": [
      "Check cache first; on miss fetch from DB and write to cache."
    ]
  },
  {
    "id": "quiz-138",
    "moduleNumber": 24,
    "topicNumber": 3,
    "topicSlug": "fullstack-system-design-angular-node-integration",
    "type": "MCQ",
    "difficulty": "Advanced",
    "title": "Full Jitter Reconnection in Distributed Systems",
    "prompt": "Why is randomized 'Full Jitter' exponential backoff implemented in Angular clients when reconnecting to Node.js backend WebSocket clusters?",
    "explanation": "Full Jitter distributes reconnection attempts randomly across a time interval, preventing thousands of clients from synchronizing their retries into massive load spikes (the Thundering Herd problem).",
    "hintsJson": "[\"It breaks synchronization to prevent thundering herd spikes.\"]",
    "options": [
      {
        "optionKey": "A",
        "optionText": "It speeds up the TCP three-way handshake by 50%.",
        "isCorrect": false
      },
      {
        "optionKey": "B",
        "optionText": "It decorrelates client reconnection spikes, preventing the Thundering Herd storm from overwhelming the server cluster.",
        "isCorrect": true
      },
      {
        "optionKey": "C",
        "optionText": "It bypasses Nginx load balancer connection limits.",
        "isCorrect": false
      },
      {
        "optionKey": "D",
        "optionText": "It encrypts WebSocket payloads without TLS certificates.",
        "isCorrect": false
      }
    ],
    "hints": [
      "It breaks synchronization to prevent thundering herd spikes."
    ]
  }
];
