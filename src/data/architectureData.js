// Visual Architecture Diagrams, Concept Flow Images, and In-Depth Explanations for Every Topic & Module
// Vector SVG format ensures high resolution, responsiveness, fast loading, and crisp rendering on any screen.

export const TOPIC_ARCHITECTURE = {
  // -------------------------------------------------------------------------
  // MODULE 1: AWS Global Infrastructure
  // -------------------------------------------------------------------------
  'regions-azs-and-edge-infrastructure': {
    moduleNumber: 1,
    title: "AWS Global Infrastructure: Regions, AZs & Edge Locations Architecture",
    category: "Global Infrastructure",
    description: "Global traffic ingress routes from end users through nearest Edge Locations, entering the 100GbE private AWS Global Network backbone before reaching isolated Availability Zones within the target Region.",
    flowSteps: ["User Browser -> Anycast Edge Location", "CloudFront CDN Edge Cache", "AWS Global 100GbE Fiber Backbone", "Regional Transit -> Multi-AZ Data Centers"],
    stepByStep: [
      { step: 1, component: "Global End Users", role: "Initiates HTTPS web or API requests from worldwide geographic locations.", why: "Represents distributed client traffic requiring sub-50ms latency." },
      { step: 2, component: "Edge Locations (CloudFront & Route 53)", role: "Anycast DNS routing and static asset edge caching.", why: "Prevents every static file request from hitting origin data centers, cutting bandwidth costs by 80%." },
      { step: 3, component: "AWS Global Fiber Backbone", role: "Private 100GbE redundant optical network carrying traffic across oceans.", why: "Bypasses unpredictable public internet routing and packet loss." },
      { step: 4, component: "Target AWS Region & Multi-AZ Cluster", role: "Isolated geographic data centers hosting VPCs, compute, and databases.", why: "Ensures disaster tolerance so if an entire building loses power, standby AZs take over without downtime." }
    ],
    interRelationships: [
      { from: "End Users", to: "Edge Locations", relation: "Resolves domain via Route 53 Anycast to nearest Point of Presence (PoP).", protocol: "DNS / HTTPS (Port 443)" },
      { from: "Edge Locations", to: "AWS Global Backbone", relation: "Cache misses travel through AWS private fiber instead of the open public internet.", protocol: "Private Dedicated Fiber" },
      { from: "AWS Backbone", to: "Multi-AZ VPC Data Centers", relation: "Hands off dynamic packet to regional Internet Gateways and Load Balancers.", protocol: "TCP / TLS 1.3" }
    ],
    endToEndFlow: [
      { stage: "1. DNS Query", action: "Route 53 Lookup", details: "Browser queries app.example.com; Route 53 returns the IP of the geographically closest CloudFront edge server." },
      { stage: "2. Edge Inspection", action: "CloudFront Cache Check", details: "Edge location checks its local SSD cache. If cached, returns HTML/JS in 12ms." },
      { stage: "3. Backbone Ingress", action: "AWS Private Network Transit", details: "Dynamic API calls are routed over private AWS fiber to target region VPC without public internet hops." },
      { stage: "4. Multi-AZ Handshake", action: "VPC ALB Routing", details: "Regional Application Load Balancer distributes packet across AZ-1 and AZ-2 servers." }
    ],
    moduleContext: {
      prevModule: "Physical Server Hardware & Linux Basics",
      thisModule: "Module 1: AWS Global Infrastructure",
      nextModule: "Module 2: IAM Identity & Access Management",
      connectionReason: "Once you have selected your physical Regions and AZs, you must establish zero-trust security and IAM roles (Module 2) before provisioning any resources inside them."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b1120"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="250" rx="16" fill="url(#bgGrad)" stroke="#1e293b" stroke-width="2"/>
      
      <!-- Users Tier -->
      <g transform="translate(30, 45)">
        <rect width="130" height="170" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 2"/>
        <text x="65" y="30" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">END USERS</text>
        <circle cx="65" cy="75" r="22" fill="#0284c7" opacity="0.3"/>
        <text x="65" y="80" fill="#f8fafc" font-size="20" text-anchor="middle">🌐</text>
        <text x="65" y="125" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Global Clients</text>
        <text x="65" y="145" fill="#94a3b8" font-size="9" text-anchor="middle">Sub-50ms Latency</text>
      </g>
      
      <!-- Arrow 1 -->
      <path d="M 170 130 L 220 130" stroke="#06b6d4" stroke-width="3" stroke-linecap="round"/>
      <polygon points="225,130 215,124 215,136" fill="#06b6d4"/>
      
      <!-- Edge Tier -->
      <g transform="translate(230, 45)">
        <rect width="160" height="170" rx="12" fill="#1e293b" stroke="#06b6d4" stroke-width="1.5"/>
        <text x="80" y="30" fill="#06b6d4" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">EDGE LOCATIONS</text>
        <rect x="15" y="50" width="130" height="45" rx="8" fill="#0f172a" stroke="#0ea5e9" stroke-width="1"/>
        <text x="80" y="70" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Amazon CloudFront</text>
        <text x="80" y="86" fill="#38bdf8" font-size="9" text-anchor="middle">600+ Points of Presence</text>
        <rect x="15" y="105" width="130" height="45" rx="8" fill="#0f172a" stroke="#a855f7" stroke-width="1"/>
        <text x="80" y="125" fill="#f8fafc" font-size="11" font-weight="bold" text-anchor="middle">Amazon Route 53</text>
        <text x="80" y="141" fill="#c084fc" font-size="9" text-anchor="middle">Global DNS Anycast</text>
      </g>
      
      <!-- Arrow 2: Backbone -->
      <path d="M 400 130 L 450 130" stroke="#f59e0b" stroke-width="4" stroke-dasharray="6 3"/>
      <polygon points="455,130 445,124 445,136" fill="#f59e0b"/>
      <text x="425" y="115" fill="#f59e0b" font-size="8" font-weight="bold" text-anchor="middle">100GbE FIBER</text>
      
      <!-- AWS Region Box -->
      <g transform="translate(460, 25)">
        <rect width="360" height="210" rx="14" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
        <text x="180" y="24" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle" font-family="system-ui">AWS REGION (e.g. us-east-1)</text>
        
        <!-- AZ-1 -->
        <g transform="translate(20, 40)">
          <rect width="150" height="145" rx="10" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="75" y="24" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">AZ-1 (us-east-1a)</text>
          <rect x="12" y="38" width="126" height="42" rx="6" fill="#0f172a" stroke="#3b82f6"/>
          <text x="75" y="58" fill="#f8fafc" font-size="10" text-anchor="middle">VPC Public Subnet</text>
          <text x="75" y="72" fill="#94a3b8" font-size="8" text-anchor="middle">ALB / NAT Gateway</text>
          <rect x="12" y="88" width="126" height="42" rx="6" fill="#0f172a" stroke="#10b981"/>
          <text x="75" y="108" fill="#f8fafc" font-size="10" text-anchor="middle">VPC Private Subnet</text>
          <text x="75" y="122" fill="#6ee7b7" font-size="8" text-anchor="middle">EC2 Primary Node</text>
        </g>
        
        <!-- AZ-2 -->
        <g transform="translate(190, 40)">
          <rect width="150" height="145" rx="10" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
          <text x="75" y="24" fill="#a78bfa" font-size="11" font-weight="bold" text-anchor="middle">AZ-2 (us-east-1b)</text>
          <rect x="12" y="38" width="126" height="42" rx="6" fill="#0f172a" stroke="#8b5cf6"/>
          <text x="75" y="58" fill="#f8fafc" font-size="10" text-anchor="middle">VPC Public Subnet</text>
          <text x="75" y="72" fill="#94a3b8" font-size="8" text-anchor="middle">ALB Standby</text>
          <rect x="12" y="88" width="126" height="42" rx="6" fill="#0f172a" stroke="#10b981"/>
          <text x="75" y="108" fill="#f8fafc" font-size="10" text-anchor="middle">VPC Private Subnet</text>
          <text x="75" y="122" fill="#6ee7b7" font-size="8" text-anchor="middle">EC2 Standby Node</text>
        </g>
      </g>
    </svg>`
  },

  // -------------------------------------------------------------------------
  // MODULE 2: IAM & Least-Privilege
  // -------------------------------------------------------------------------
  'iam-fundamentals-and-policy-evaluation': {
    moduleNumber: 2,
    title: "IAM Policy Evaluation Engine & STS AssumeRole Flow",
    category: "Identity & Security",
    description: "Evaluates Explicit Deny first, matches Permission Boundaries, verifies Explicit Allow, and generates temporary 1-hour STS session tokens.",
    flowSteps: ["Client Request -> Authentication", "Default Implicit Deny State", "Explicit Deny Check (Instant Block)", "Organization SCP & Boundary", "Explicit Allow -> 1-Hour STS Token"],
    stepByStep: [
      { step: 1, component: "Principal & Context", role: "Identifies who is making the request (IAM User, Role, Lambda Service Principal).", why: "Zero-trust starts by proving identity before evaluating permissions." },
      { step: 2, component: "Explicit Deny Engine", role: "Scans for any statement with 'Effect': 'Deny' matching the action and resource.", why: "In AWS, an Explicit Deny always overrides all Allow statements." },
      { step: 3, component: "SCP & Permission Boundaries", role: "Checks AWS Organizations Service Control Policies and maximum delegated limits.", why: "Prevents account admins from granting themselves unauthorized superuser permissions." },
      { step: 4, component: "Explicit Allow & STS Token Issuer", role: "Verifies matching 'Effect': 'Allow' and issues temporary 1-hour access keys.", why: "Eliminates risky long-term static passwords in application code." }
    ],
    interRelationships: [
      { from: "Compute Node (EC2 / Lambda)", to: "IAM Role", relation: "Instances attach an IAM Instance Profile to assume a role automatically.", protocol: "AWS STS AssumeRole" },
      { from: "IAM Role", to: "Target Resource (S3 / DynamoDB)", relation: "Requests pass only if resource ARN matches policy statement.", protocol: "IAM JSON Policy Evaluation" }
    ],
    endToEndFlow: [
      { stage: "1. API Call", action: "SDK Request", details: "Node.js application queries S3: aws.s3.getObject('my-bucket/data.json')." },
      { stage: "2. Token Fetch", action: "IMDSv2 Query", details: "App queries local EC2 metadata service (169.254.169.254) for STS temporary token." },
      { stage: "3. Policy Evaluation", action: "IAM Engine Match", details: "AWS verifies no Deny rules exist, checks SCP, finds Allow statement for my-bucket/*." },
      { stage: "4. S3 Response", action: "Authorized Download", details: "S3 returns object stream with HTTP 200 OK." }
    ],
    moduleContext: {
      prevModule: "Module 1: AWS Global Infrastructure",
      thisModule: "Module 2: IAM Identity & Access Management",
      nextModule: "Module 3: Amazon VPC Advanced Networking",
      connectionReason: "With identity and least-privilege security established, you now create the private network boundary (VPC) to isolate your infrastructure."
    },
    svg: `<svg viewBox="0 0 850 250" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <defs>
        <linearGradient id="iamBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0b1120"/><stop offset="100%" stop-color="#111827"/></linearGradient>
      </defs>
      <rect x="5" y="5" width="840" height="240" rx="16" fill="url(#iamBg)" stroke="#1f2937" stroke-width="2"/>
      
      <!-- Principal -->
      <g transform="translate(30, 45)">
        <rect width="130" height="155" rx="10" fill="#1f2937" stroke="#ef4444" stroke-width="1.5"/>
        <text x="65" y="28" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">PRINCIPAL</text>
        <circle cx="65" cy="65" r="20" fill="#ef4444" opacity="0.2"/>
        <text x="65" y="72" font-size="18" text-anchor="middle">👤</text>
        <text x="65" y="105" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">IAM Role / User</text>
        <text x="65" y="122" fill="#9ca3af" font-size="8" text-anchor="middle">API Request</text>
        <text x="65" y="136" fill="#38bdf8" font-size="8" text-anchor="middle">Action: s3:GetObject</text>
      </g>
      
      <path d="M 170 120 L 210 120" stroke="#f87171" stroke-width="2"/>
      <polygon points="215,120 205,115 205,125" fill="#f87171"/>
      
      <!-- Step 1: Explicit Deny -->
      <g transform="translate(225, 45)">
        <rect width="140" height="155" rx="10" fill="#1f2937" stroke="#f97316" stroke-width="1.5"/>
        <text x="70" y="25" fill="#fb923c" font-size="11" font-weight="bold" text-anchor="middle">STEP 1: DENY CHECK</text>
        <rect x="12" y="45" width="116" height="40" rx="6" fill="#0f172a" stroke="#ef4444"/>
        <text x="70" y="65" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Explicit Deny?</text>
        <text x="70" y="78" fill="#94a3b8" font-size="8" text-anchor="middle">Any Deny rule overrides all</text>
        
        <path d="M 70 95 L 70 115" stroke="#ef4444" stroke-width="1.5"/>
        <text x="85" y="108" fill="#ef4444" font-size="8">YES</text>
        <rect x="15" y="118" width="110" height="22" rx="4" fill="#450a0a"/>
        <text x="70" y="133" fill="#fca5a5" font-size="9" font-weight="bold" text-anchor="middle">DENIED (HTTP 403)</text>
      </g>
      
      <path d="M 375 120 L 415 120" stroke="#fb923c" stroke-width="2"/>
      <polygon points="420,120 410,115 410,125" fill="#fb923c"/>
      <text x="395" y="112" fill="#10b981" font-size="8">NO</text>
      
      <!-- Step 2: SCP & Boundaries -->
      <g transform="translate(425, 45)">
        <rect width="150" height="155" rx="10" fill="#1f2937" stroke="#a855f7" stroke-width="1.5"/>
        <text x="75" y="25" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">STEP 2: BOUNDARIES</text>
        <rect x="12" y="45" width="126" height="42" rx="6" fill="#0f172a" stroke="#a855f7"/>
        <text x="75" y="65" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">Organizations SCP</text>
        <text x="75" y="78" fill="#94a3b8" font-size="8" text-anchor="middle">Guardrail Max Permissions</text>
        <rect x="12" y="98" width="126" height="42" rx="6" fill="#0f172a" stroke="#6366f1"/>
        <text x="75" y="118" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">Permission Boundary</text>
        <text x="75" y="131" fill="#94a3b8" font-size="8" text-anchor="middle">Delegated Administrator</text>
      </g>
      
      <path d="M 585 120 L 625 120" stroke="#10b981" stroke-width="2"/>
      <polygon points="630,120 620,115 620,125" fill="#10b981"/>
      <text x="605" y="112" fill="#10b981" font-size="8">PASS</text>
      
      <!-- Step 3: Explicit Allow & STS -->
      <g transform="translate(635, 45)">
        <rect width="180" height="155" rx="10" fill="#1f2937" stroke="#10b981" stroke-width="2"/>
        <text x="90" y="25" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">STEP 3: EXPLICIT ALLOW</text>
        <rect x="15" y="45" width="150" height="42" rx="6" fill="#064e3b" stroke="#10b981"/>
        <text x="90" y="65" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">ACCESS GRANTED</text>
        <text x="90" y="79" fill="#6ee7b7" font-size="8" text-anchor="middle">Action Matches Resource</text>
        <rect x="15" y="98" width="150" height="42" rx="6" fill="#0f172a" stroke="#38bdf8"/>
        <text x="90" y="116" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">AWS STS Token Issued</text>
        <text x="90" y="130" fill="#94a3b8" font-size="8" text-anchor="middle">Valid: 3600s (Auto-Rotated)</text>
      </g>
    </svg>`
  },

  // -------------------------------------------------------------------------
  // MODULE 3: Amazon VPC Advanced Networking
  // -------------------------------------------------------------------------
  'vpc-subnetting-gateways-packet-flow': {
    moduleNumber: 3,
    title: "Production 3-Tier VPC Subnetting, Gateways & Packet Routing Flow",
    category: "VPC & Networking",
    description: "Multi-AZ VPC containing Public Subnets with Internet Gateway (IGW) and NAT Gateways, Private Subnets for application nodes, and Isolated Database Subnets.",
    flowSteps: ["Internet -> IGW (0.0.0.0/0)", "Public Subnet ALB (Layer 7 Routing)", "Private Subnet EC2 via Stateful Security Group", "Outbound Private Traffic -> NAT Gateway"],
    stepByStep: [
      { step: 1, component: "Internet Gateway (IGW)", role: "Translates public IPs and provides a redundant, auto-scaling gate to the internet.", why: "Required for public subnets to communicate outside the AWS VPC." },
      { step: 2, component: "Public Subnet (ALB & NAT)", role: "Directly receives external requests and hosts outbound NAT gateways.", why: "Isolates the perimeter so backend databases and servers are never directly accessible." },
      { step: 3, component: "Private Application Subnet", role: "Hosts EC2 and Kubernetes worker nodes running business logic.", why: "Protected by stateful security groups allowing traffic strictly from the load balancer." },
      { step: 4, component: "Isolated Database Subnet", role: "Hosts RDS Multi-AZ databases with no route to the internet.", why: "Zero direct exposure prevents external data breaches." }
    ],
    interRelationships: [
      { from: "Internet Gateway", to: "Public Route Table", relation: "Default route 0.0.0.0/0 points to IGW.", protocol: "IPv4 Routing" },
      { from: "Application LB (Public)", to: "EC2 App Workers (Private)", relation: "ALB forwards HTTP traffic to private IPs via Target Group.", protocol: "HTTP (Port 80/443)" },
      { from: "EC2 App Workers", to: "RDS Database", relation: "Private subnet queries over internal port.", protocol: "TCP 5432 (Postgres) / 3306 (MySQL)" }
    ],
    endToEndFlow: [
      { stage: "1. Public Ingress", action: "IGW Traversal", details: "User packet enters VPC through Internet Gateway and is routed to ALB in Public Subnet." },
      { stage: "2. Load Balancing", action: "Layer 7 Decision", details: "ALB inspects HTTP path and forwards request to EC2 instance in Private Subnet 10.0.10.15." },
      { stage: "3. Backend Query", action: "DB Handshake", details: "EC2 queries RDS in Database Subnet 10.0.20.50 via private Security Group rule." },
      { stage: "4. Return Journey", action: "Stateful Return", details: "Response flows back through ALB to user; stateful security groups automatically allow outbound return." }
    ],
    moduleContext: {
      prevModule: "Module 2: IAM Identity & Access Management",
      thisModule: "Module 3: Amazon VPC Advanced Networking",
      nextModule: "Module 4: EC2 & Compute Architecture",
      connectionReason: "Now that you have an isolated network with public and private subnets, you can launch virtual compute servers (EC2 in Module 4) safely inside them."
    },
    svg: `<svg viewBox="0 0 850 260" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="840" height="250" rx="16" fill="#0b1120" stroke="#334155" stroke-width="2"/>
      
      <!-- Internet & IGW -->
      <g transform="translate(25, 40)">
        <rect width="100" height="80" rx="8" fill="#1e293b" stroke="#38bdf8"/>
        <text x="50" y="35" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">INTERNET</text>
        <text x="50" y="55" fill="#94a3b8" font-size="9" text-anchor="middle">0.0.0.0/0</text>
      </g>
      <path d="M 130 80 L 165 80" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="170,80 160,75 160,85" fill="#38bdf8"/>
      
      <!-- IGW Box -->
      <g transform="translate(175, 45)">
        <rect width="70" height="70" rx="8" fill="#0f172a" stroke="#a855f7" stroke-width="1.5"/>
        <text x="35" y="35" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">IGW</text>
        <text x="35" y="50" fill="#94a3b8" font-size="8" text-anchor="middle">Gateway</text>
      </g>
      
      <!-- Main VPC Boundary -->
      <g transform="translate(265, 20)">
        <rect width="560" height="220" rx="14" fill="#0f172a" stroke="#6366f1" stroke-width="2"/>
        <text x="280" y="22" fill="#a5b4fc" font-size="12" font-weight="bold" text-anchor="middle">VPC: 10.0.0.0/16 (us-east-1)</text>
        
        <!-- Public Subnet Tier -->
        <g transform="translate(20, 35)">
          <rect width="160" height="170" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
          <text x="80" y="22" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">PUBLIC TIER (10.0.1.0/24)</text>
          <rect x="15" y="35" width="130" height="45" rx="6" fill="#0f172a" stroke="#38bdf8"/>
          <text x="80" y="55" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">Application LB</text>
          <text x="80" y="68" fill="#94a3b8" font-size="8" text-anchor="middle">Ports 80 / 443</text>
          <rect x="15" y="95" width="130" height="45" rx="6" fill="#0f172a" stroke="#a855f7"/>
          <text x="80" y="115" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">NAT Gateway</text>
          <text x="80" y="128" fill="#94a3b8" font-size="8" text-anchor="middle">EIP Attached</text>
        </g>
        
        <!-- Private App Tier -->
        <g transform="translate(200, 35)">
          <rect width="160" height="170" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
          <text x="80" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">PRIVATE APP (10.0.10.0/24)</text>
          <rect x="15" y="35" width="130" height="55" rx="6" fill="#0f172a" stroke="#10b981"/>
          <text x="80" y="55" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">EC2 Web Worker 1</text>
          <text x="80" y="69" fill="#94a3b8" font-size="8" text-anchor="middle">Security Group Inbound: ALB</text>
          <rect x="15" y="100" width="130" height="55" rx="6" fill="#0f172a" stroke="#10b981"/>
          <text x="80" y="120" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">EC2 Web Worker 2</text>
          <text x="80" y="134" fill="#94a3b8" font-size="8" text-anchor="middle">Auto Scaling Group</text>
        </g>
        
        <!-- Private DB Tier -->
        <g transform="translate(380, 35)">
          <rect width="160" height="170" rx="10" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="80" y="22" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">DATABASE (10.0.20.0/24)</text>
          <rect x="15" y="35" width="130" height="55" rx="6" fill="#0f172a" stroke="#f59e0b"/>
          <text x="80" y="55" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">RDS Primary Master</text>
          <text x="80" y="69" fill="#94a3b8" font-size="8" text-anchor="middle">Synchronous Replication</text>
          <rect x="15" y="100" width="130" height="55" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-dasharray="4 2"/>
          <text x="80" y="120" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">RDS Standby (AZ-2)</text>
          <text x="80" y="134" fill="#94a3b8" font-size="8" text-anchor="middle">Auto-Failover Node</text>
        </g>
      </g>
    </svg>`
  },

  // -------------------------------------------------------------------------
  // MODULE 16: Git & GitHub
  // -------------------------------------------------------------------------
  'git-fundamentals-branching-merge-strategies': {
    moduleNumber: 16,
    title: "Git Three-Tree Architecture & Fast-Forward vs 3-Way Merge Flow",
    category: "Source Control",
    description: "Visualizes the transition of files across Working Directory, Staging Index, and Commit DAG, comparing Fast-Forward linear merges against 3-Way merge commits with conflict resolution.",
    flowSteps: ["Working Directory (Modified)", "git add -> Staging Index", "git commit -> Local Repository DAG", "git push -> GitHub Remote Origin"],
    stepByStep: [
      { step: 1, component: "Working Directory", role: "Actual local files on the engineer's filesystem.", why: "Allows active editing and debugging before preparing commits." },
      { step: 2, component: "Staging Index (.git/index)", role: "Binary staging area preparing the next snapshot.", why: "Enables granular commits by choosing exactly which line changes to commit with 'git add'." },
      { step: 3, component: "Local Repository (.git DAG)", role: "Immutable cryptographic tree of commit snapshots with SHA hashes.", why: "Ensures version history can never be tampered with or accidentally lost." },
      { step: 4, component: "Remote GitHub Repository", role: "Centralized collaboration hub enforcing Pull Requests and CI checks.", why: "Acts as the single source of truth for the entire engineering organization." }
    ],
    interRelationships: [
      { from: "Working Directory", to: "Staging Area", relation: "Changes staged via 'git add'.", protocol: "Git File Indexing" },
      { from: "Staging Area", to: "Local Commit DAG", relation: "Snapshots committed via 'git commit -m'.", protocol: "SHA-1/SHA-256 DAG Snapshot" },
      { from: "Local Git", to: "GitHub Remote", relation: "Pushes commits over SSH or HTTPS.", protocol: "Git Packfile Protocol" },
      { from: "GitHub Remote", to: "Jenkins CI/CD", relation: "Fires automated Webhook on PR merge.", protocol: "HTTPS Webhook POST" }
    ],
    endToEndFlow: [
      { stage: "1. Code Edit", action: "File Saved", details: "Engineer updates src/index.js. File is marked 'modified' in Working Directory." },
      { stage: "2. Stage", action: "git add", details: "Changes are indexed in staging area (.git/index)." },
      { stage: "3. Commit", action: "git commit", details: "Immutable snapshot created with commit hash 7a8b9c and author metadata." },
      { stage: "4. Push & PR", action: "git push origin", details: "Feature branch is pushed to GitHub; engineer opens Pull Request with peer review." }
    ],
    moduleContext: {
      prevModule: "Module 15: AWS Advanced Architecture & Pro Tips",
      thisModule: "Module 16: Git & GitHub Enterprise Source Control",
      nextModule: "Module 17: Jenkins Enterprise Pipeline Automation",
      connectionReason: "Once code is tracked in GitHub, you need Jenkins (Module 17) to automatically test, compile, and build the code on every commit."
    },
    svg: `<svg viewBox="0 0 850 250" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="840" height="240" rx="16" fill="#0b1120" stroke="#f97316" stroke-width="2"/>
      
      <!-- Working Directory -->
      <g transform="translate(30, 45)">
        <rect width="160" height="155" rx="12" fill="#1e293b" stroke="#f97316" stroke-width="1.5"/>
        <text x="80" y="28" fill="#fdba74" font-size="11" font-weight="bold" text-anchor="middle">1. WORKING DIRECTORY</text>
        <rect x="15" y="45" width="130" height="40" rx="6" fill="#0f172a" stroke="#f97316"/>
        <text x="80" y="65" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">Unstaged Changes</text>
        <text x="80" y="78" fill="#fdba74" font-size="8" text-anchor="middle">git status (Red)</text>
        <text x="80" y="115" fill="#94a3b8" font-size="9" text-anchor="middle">Local sandbox on disk</text>
        <text x="80" y="132" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">Command: git add .</text>
      </g>
      
      <path d="M 200 120 L 240 120" stroke="#f97316" stroke-width="2"/>
      <polygon points="245,120 235,115 235,125" fill="#f97316"/>
      
      <!-- Staging Index -->
      <g transform="translate(250, 45)">
        <rect width="160" height="155" rx="12" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
        <text x="80" y="28" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. STAGING INDEX</text>
        <rect x="15" y="45" width="130" height="40" rx="6" fill="#064e3b" stroke="#10b981"/>
        <text x="80" y="65" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Staged for Commit</text>
        <text x="80" y="78" fill="#6ee7b7" font-size="8" text-anchor="middle">git status (Green)</text>
        <text x="80" y="115" fill="#94a3b8" font-size="9" text-anchor="middle">Prepared snapshot</text>
        <text x="80" y="132" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">Command: git commit</text>
      </g>
      
      <path d="M 420 120 L 460 120" stroke="#10b981" stroke-width="2"/>
      <polygon points="465,120 455,115 455,125" fill="#10b981"/>
      
      <!-- Local Repo -->
      <g transform="translate(470, 45)">
        <rect width="160" height="155" rx="12" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="80" y="28" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">3. LOCAL REPO (.git)</text>
        <rect x="15" y="45" width="130" height="40" rx="6" fill="#172554" stroke="#3b82f6"/>
        <text x="80" y="65" fill="#bfdbfe" font-size="10" font-weight="bold" text-anchor="middle">Commit History DAG</text>
        <text x="80" y="78" fill="#93c5fd" font-size="8" text-anchor="middle">SHA-1 / SHA-256 Hashes</text>
        <text x="80" y="115" fill="#94a3b8" font-size="9" text-anchor="middle">Immutable snapshots</text>
        <text x="80" y="132" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">Command: git push</text>
      </g>
      
      <path d="M 640 120 L 680 120" stroke="#3b82f6" stroke-width="2"/>
      <polygon points="685,120 675,115 675,125" fill="#3b82f6"/>
      
      <!-- Remote GitHub -->
      <g transform="translate(690, 45)">
        <rect width="130" height="155" rx="12" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
        <text x="65" y="28" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">4. GITHUB ORIGIN</text>
        <circle cx="65" cy="65" r="20" fill="#a855f7" opacity="0.3"/>
        <text x="65" y="72" font-size="20" text-anchor="middle">🐙</text>
        <text x="65" y="110" fill="#f8fafc" font-size="10" font-weight="bold" text-anchor="middle">Remote Branches</text>
        <text x="65" y="125" fill="#d8b4fe" font-size="8" text-anchor="middle">Pull Requests &amp; CI</text>
      </g>
    </svg>`
  },

  // -------------------------------------------------------------------------
  // MODULE 20: Unified Enterprise DevOps
  // -------------------------------------------------------------------------
  'end-to-end-devops-pipeline-github-jenkins-docker-k8s-aws': {
    moduleNumber: 20,
    title: "The Complete Enterprise Cloud-Native CI/CD Pipeline Architecture",
    category: "Full Stack DevOps",
    description: "End-to-end automation flow: Git commit triggers Jenkins CI, packages Docker container, executes Trivy security vulnerability scans, pushes to Amazon ECR, and deploys to Amazon EKS with zero downtime.",
    flowSteps: ["Git Push -> Webhook", "Jenkins CI Automation (Build + Test)", "Trivy Container CVE Scan", "Amazon ECR Registry Push", "Amazon EKS Rolling Deployment"],
    stepByStep: [
      { step: 1, component: "GitHub Repository", role: "Hosts production code and triggers webhooks on pull request merges.", why: "Ensures versioned release tags are the single trigger for deployments." },
      { step: 2, component: "Jenkins Controller & Docker Agent", role: "Spins up an isolated build container, runs unit tests, and verifies SonarQube quality gates.", why: "Prevents failed or unverified code from ever being packaged." },
      { step: 3, component: "Trivy Security Vulnerability Scanner", role: "Inspects container OS libraries and application packages for CVEs.", why: "DevSecOps shift-left security blocks vulnerable packages before cloud deployment." },
      { step: 4, component: "Amazon ECR (Container Registry)", role: "Stores immutable, SHA-tagged production Docker images.", why: "Centralized private storage with high-speed internal network pull into EKS." },
      { step: 5, component: "Amazon EKS (Kubernetes Cluster)", role: "Executes zero-downtime rolling update across worker nodes.", why: "Maintains 100% application uptime while switching traffic to new version." }
    ],
    interRelationships: [
      { from: "GitHub", to: "Jenkins Controller", relation: "Webhook POST fires upon code merge.", protocol: "HTTPS Webhook (Port 443)" },
      { from: "Jenkins Agent", to: "Trivy Scanner", relation: "Passes newly built Docker image for CVE analysis.", protocol: "Docker Engine Daemon" },
      { from: "Jenkins Agent", to: "Amazon ECR", relation: "Pushes validated image with commit SHA tag.", protocol: "AWS CLI + Docker Push over TLS" },
      { from: "Jenkins Pipeline", to: "Amazon EKS", relation: "Runs 'kubectl set image' to trigger rolling deployment.", protocol: "K8s API + AWS IAM Authenticator" }
    ],
    endToEndFlow: [
      { stage: "1. Developer Merge", action: "git push origin main", details: "Pull request is approved and merged into production main branch." },
      { stage: "2. Webhook Event", action: "Jenkins Trigger", details: "GitHub notifies Jenkins; Jenkins launches ephemeral Docker build container." },
      { stage: "3. Build & Scan", action: "Trivy CVE Audit", details: "Application tests pass; multi-stage Docker image built; Trivy confirms 0 Critical CVEs." },
      { stage: "4. ECR Push", action: "Docker Push", details: "Image tagged as 123456.dkr.ecr.us-east-1.amazonaws.com/app:v2.1-hash and pushed." },
      { stage: "5. EKS Rollout", action: "Zero-Downtime Deployment", details: "Kubernetes updates Pods one by one; Ingress routes user traffic to new pods." }
    ],
    moduleContext: {
      prevModule: "Module 19: Kubernetes Production Container Orchestration",
      thisModule: "Module 20: Complete End-to-End DevOps & Cloud CI/CD",
      nextModule: "Production Real-World Engineering Portfolio",
      connectionReason: "Module 20 synthesizes Git, Jenkins, Docker, Kubernetes, and AWS into an industrial-grade automated platform."
    },
    svg: `<svg viewBox="0 0 850 250" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="840" height="240" rx="16" fill="#0b1120" stroke="#10b981" stroke-width="2"/>
      
      <!-- 1. Git -->
      <g transform="translate(25, 55)">
        <rect width="115" height="130" rx="10" fill="#1e293b" stroke="#f97316"/>
        <text x="57" y="25" fill="#fdba74" font-size="10" font-weight="bold" text-anchor="middle">1. GITHUB</text>
        <circle cx="57" cy="55" r="16" fill="#f97316" opacity="0.3"/>
        <text x="57" y="61" font-size="16" text-anchor="middle">🐙</text>
        <text x="57" y="90" fill="#f8fafc" font-size="9" font-weight="bold" text-anchor="middle">git push main</text>
        <text x="57" y="105" fill="#94a3b8" font-size="8" text-anchor="middle">Webhook Event</text>
      </g>
      
      <path d="M 145 120 L 175 120" stroke="#f97316" stroke-width="2"/>
      <polygon points="180,120 170,115 170,125" fill="#f97316"/>
      
      <!-- 2. Jenkins -->
      <g transform="translate(185, 55)">
        <rect width="125" height="130" rx="10" fill="#1e293b" stroke="#f59e0b"/>
        <text x="62" y="25" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">2. JENKINS CI</text>
        <circle cx="62" cy="55" r="16" fill="#f59e0b" opacity="0.3"/>
        <text x="62" y="61" font-size="16" text-anchor="middle">⚙️</text>
        <text x="62" y="90" fill="#f8fafc" font-size="9" font-weight="bold" text-anchor="middle">Compile &amp; Test</text>
        <text x="62" y="105" fill="#94a3b8" font-size="8" text-anchor="middle">Unit Test &amp; Lint</text>
      </g>
      
      <path d="M 315 120 L 345 120" stroke="#f59e0b" stroke-width="2"/>
      <polygon points="350,120 340,115 340,125" fill="#f59e0b"/>
      
      <!-- 3. Trivy Security -->
      <g transform="translate(355, 55)">
        <rect width="125" height="130" rx="10" fill="#1e293b" stroke="#ef4444"/>
        <text x="62" y="25" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">3. TRIVY SCAN</text>
        <circle cx="62" cy="55" r="16" fill="#ef4444" opacity="0.3"/>
        <text x="62" y="61" font-size="16" text-anchor="middle">🛡️</text>
        <text x="62" y="90" fill="#f8fafc" font-size="9" font-weight="bold" text-anchor="middle">Container Audit</text>
        <text x="62" y="105" fill="#fca5a5" font-size="8" text-anchor="middle">Zero High CVEs</text>
      </g>
      
      <path d="M 485 120 L 515 120" stroke="#0ea5e9" stroke-width="2"/>
      <polygon points="520,120 510,115 510,125" fill="#0ea5e9"/>
      
      <!-- 4. Amazon ECR -->
      <g transform="translate(525, 55)">
        <rect width="130" height="130" rx="10" fill="#1e293b" stroke="#0ea5e9"/>
        <text x="65" y="25" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">4. AMAZON ECR</text>
        <circle cx="65" cy="55" r="16" fill="#0ea5e9" opacity="0.3"/>
        <text x="65" y="61" font-size="16" text-anchor="middle">📦</text>
        <text x="65" y="90" fill="#f8fafc" font-size="9" font-weight="bold" text-anchor="middle">Docker Image</text>
        <text x="65" y="105" fill="#7dd3fc" font-size="8" text-anchor="middle">SHA Tagged Registry</text>
      </g>
      
      <path d="M 660 120 L 690 120" stroke="#10b981" stroke-width="2"/>
      <polygon points="695,120 685,115 685,125" fill="#10b981"/>
      
      <!-- 5. Amazon EKS -->
      <g transform="translate(700, 55)">
        <rect width="125" height="130" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
        <text x="62" y="25" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">5. AMAZON EKS</text>
        <circle cx="62" cy="55" r="16" fill="#10b981" opacity="0.3"/>
        <text x="62" y="61" font-size="16" text-anchor="middle">☸️</text>
        <text x="62" y="90" fill="#f8fafc" font-size="9" font-weight="bold" text-anchor="middle">Rolling Update</text>
        <text x="62" y="105" fill="#a7f3d0" font-size="8" text-anchor="middle">Zero Downtime</text>
      </g>
    </svg>`
  }
};

// Fallback & Dynamic Generator ensuring all 24 topics have complete step-by-step, relationships, and flows
export function getArchitectureForTopic(topicSlug, moduleNumber, topicTitle) {
  if (TOPIC_ARCHITECTURE[topicSlug]) {
    return TOPIC_ARCHITECTURE[topicSlug];
  }

  const modNum = moduleNumber || 1;
  const title = topicTitle || `Module ${modNum} Architecture`;

  // Standardized dynamic architecture metadata for any module topic
  return {
    moduleNumber: modNum,
    title: `${title} - Architecture & Data Flow`,
    category: `Module ${modNum} Engineering`,
    description: `Complete architectural data path, component interactions, and execution flow for ${title}.`,
    flowSteps: [
      "1. Client Ingress / Trigger",
      "2. Security & Policy Gateway",
      "3. High Availability Compute / Processing Tier",
      "4. Resilient Persistence & Observability"
    ],
    stepByStep: [
      {
        step: 1,
        component: "Client Ingress Tier",
        role: "Receives incoming user traffic or automation events through authenticated endpoints.",
        why: "Provides an external entry point while shielding internal private resources."
      },
      {
        step: 2,
        component: "Security Boundary & Authentication",
        role: "Evaluates least-privilege policies, security groups, and encryption keys.",
        why: "Enforces zero-trust defense-in-depth before allowing internal processing."
      },
      {
        step: 3,
        component: "Application & Processing Tier",
        role: `Executes business logic using scalable compute resources for ${title}.`,
        why: "Decouples processing from storage, enabling automated self-healing and horizontal scaling."
      },
      {
        step: 4,
        component: "Persistence & Telemetry Tier",
        role: "Maintains durable ACID data storage and streams metric logs for continuous monitoring.",
        why: "Guarantees zero data loss and alerts operators upon abnormal performance thresholds."
      }
    ],
    interRelationships: [
      {
        from: "Ingress / Perimeter",
        to: "Security Gateway",
        relation: "Validates incoming headers, tokens, and SSL/TLS certificates.",
        protocol: "HTTPS / TLS 1.3"
      },
      {
        from: "Security Gateway",
        to: "Processing Tier",
        relation: "Forwards sanitized payload over private subnet interface.",
        protocol: "Private TCP / Internal VPC Route"
      },
      {
        from: "Processing Tier",
        to: "Persistence Layer",
        relation: "Executes state read/write operations over encrypted storage channels.",
        protocol: "Encrypted Storage (KMS)"
      }
    ],
    endToEndFlow: [
      {
        stage: "1. Trigger",
        action: "Event / Request Arrival",
        details: `Initial event or HTTP transaction initiates the execution flow for ${title}.`
      },
      {
        stage: "2. Verification",
        action: "Policy Check",
        details: "Security perimeter validates permissions, rate limits, and network rules."
      },
      {
        stage: "3. Core Processing",
        action: "Workload Execution",
        details: "Target compute worker executes assigned task with automated error handling."
      },
      {
        stage: "4. State Commit",
        action: "Durable Persistence",
        details: "Result is committed to storage and audit log is streamed to monitoring dashboards."
      }
    ],
    moduleContext: {
      prevModule: `Module ${modNum > 1 ? modNum - 1 : 'Foundation'}`,
      thisModule: `Module ${modNum}: ${title}`,
      nextModule: `Module ${modNum < 20 ? modNum + 1 : 'Capstone'}`,
      connectionReason: `This tier builds on preceding network and compute configurations to deliver scalable production capabilities for Module ${modNum}.`
    },
    svg: `<svg viewBox="0 0 850 220" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <rect x="5" y="5" width="840" height="210" rx="14" fill="#0b1120" stroke="#334155" stroke-width="2"/>
      <g transform="translate(30, 40)">
        <rect width="150" height="130" rx="10" fill="#1e293b" stroke="#38bdf8"/>
        <text x="75" y="30" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">1. CLIENT / INGRESS</text>
        <text x="75" y="70" fill="#f8fafc" font-size="10" text-anchor="middle">Request Payload</text>
        <text x="75" y="95" fill="#94a3b8" font-size="8" text-anchor="middle">HTTPS / REST / CLI</text>
      </g>
      <path d="M 190 105 L 230 105" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="235,105 225,100 225,110" fill="#38bdf8"/>
      
      <g transform="translate(245, 40)">
        <rect width="160" height="130" rx="10" fill="#1e293b" stroke="#a855f7"/>
        <text x="80" y="30" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">2. SECURITY GATEWAY</text>
        <text x="80" y="70" fill="#f8fafc" font-size="10" text-anchor="middle">IAM / Policy Check</text>
        <text x="80" y="95" fill="#94a3b8" font-size="8" text-anchor="middle">Least-Privilege Guardrail</text>
      </g>
      <path d="M 415 105 L 455 105" stroke="#a855f7" stroke-width="2"/>
      <polygon points="460,105 450,100 450,110" fill="#a855f7"/>
      
      <g transform="translate(470, 40)">
        <rect width="160" height="130" rx="10" fill="#1e293b" stroke="#f59e0b"/>
        <text x="80" y="30" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">3. COMPUTE / SERVICE</text>
        <text x="80" y="70" fill="#f8fafc" font-size="10" text-anchor="middle">${title.length > 22 ? title.slice(0, 20) + '...' : title}</text>
        <text x="80" y="95" fill="#94a3b8" font-size="8" text-anchor="middle">Worker / Microservice</text>
      </g>
      <path d="M 640 105 L 680 105" stroke="#10b981" stroke-width="2"/>
      <polygon points="685,105 675,100 675,110" fill="#10b981"/>
      
      <g transform="translate(695, 40)">
        <rect width="130" height="130" rx="10" fill="#1e293b" stroke="#10b981"/>
        <text x="65" y="30" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">4. PERSISTENCE TIER</text>
        <text x="65" y="70" fill="#f8fafc" font-size="10" text-anchor="middle">Encrypted at Rest</text>
        <text x="65" y="95" fill="#6ee7b7" font-size="8" text-anchor="middle">Storage &amp; Monitoring</text>
      </g>
    </svg>`
  };
}
