import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Smartphone,
  ShoppingCart,
  Eye,
  Zap,
  Heart,
  Award,
  Lightbulb,
  BarChart3,
  Search,
  Filter,
  Star,
  Play,
  Globe,
  UserCheck,
  Building,
  Activity,
  Layers,
  Rocket,
  Shield,
  Settings,
  Lock,
  FileText,
  Grid3X3,
  History,
} from "lucide-react";
import { FigmaIcon } from "../icons/FigmaIcon";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { useRouter } from "../Router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState, useEffect } from "react";

export function CaseStudyTwo() {
  const { navigateTo } = useRouter();

  const designPhases = [
    {
      title: "Discovery",
      icon: Search,
      description:
        "Gathered feedback from admins & clients on access issues",
    },
    {
      title: "Define",
      icon: Target,
      description:
        "Identified opportunities for role templates, custom roles, and audit trails",
    },
    {
      title: "Ideate",
      icon: Lightbulb,
      description:
        "Explored models for granular permissions & visual matrices",
    },
    {
      title: "Prototype",
      icon: Smartphone,
      description:
        "Built Figma prototypes for role creation, assignment, and auditing",
    },
    {
      title: "Test & Iterate",
      icon: CheckCircle,
      description:
        "Refined flows after usability sessions with enterprise admins",
    },
  ];

  const teamMembers = [
    {
      name: "Product Manager",
      role: "Product Strategy & Requirements",
      type: "product",
    },
    {
      name: "Security Analyst",
      role: "Security & Compliance Requirements",
      type: "security",
    },
    {
      name: "Backend Engineer",
      role: "RBAC System Architecture",
      type: "dev",
    },
    {
      name: "Frontend Engineer",
      role: "Admin Interface Development",
      type: "dev",
    },
    {
      name: "Client Success Analyst",
      role: "Enterprise Onboarding",
      type: "analyst",
    },
    {
      name: "Business Operations",
      role: "Implementation Strategy",
      type: "business",
    },
  ];

  const challenges = [
    {
      title: "Rigid Permissions",
      subtitle: "Predefined roles didn't scale",
      description:
        "Predefined roles didn't scale to complex enterprise use cases.",
      impact:
        "Result: Admins had to create workarounds, increasing security risk.",
      stat: "100%",
      statLabel: "Predefined",
      color: "destructive",
    },
    {
      title: "Confusing Interfaces",
      subtitle: "Unclear access visibility",
      description:
        "End users didn't know what they could or couldn't access.",
      impact:
        "Result: High support ticket volume & onboarding friction.",
      stat: "48",
      statLabel: "Clicks",
      color: "chart-2",
    },
    {
      title: "Inefficient Admin Management",
      subtitle: "Manual and repetitive tasks",
      description:
        "Assigning permissions was manual and repetitive (~48 clicks to configure a single user).",
      impact:
        "Result: Productivity bottlenecks for enterprise IT teams.",
      stat: "+40%",
      statLabel: "Admin Time",
      color: "chart-4",
    },
  ];

  const solutions = [
    {
      title: "Role Templates",
      description:
        "Predefined roles (Admin, Manager, Analyst, etc.) to simplify setup",
      impact: "Reduced onboarding time for new clients",
      result: "Streamlined initial configuration process",
      icon: Shield,
      color: "primary",
    },
    {
      title: "Custom Roles",
      description:
        "Full flexibility to create, edit, and delete roles with granular permissions",
      impact:
        "Scalable system adaptable to enterprise complexity",
      result: "100% customizable permission structures",
      icon: Settings,
      color: "chart-2",
    },
    {
      title: "Permission Matrix",
      description:
        "Visual grid of resources vs. actions (view, edit, run, delete)",
      impact:
        "Clear at-a-glance permissions overview, reducing confusion",
      result: "Instant visibility into access rights",
      icon: Grid3X3,
      color: "chart-3",
    },
    {
      title: "Audit Trails",
      description:
        "Complete history of role assignments and permission changes",
      impact: "Improved accountability and compliance tracking",
      result: "Full regulatory compliance support",
      icon: History,
      color: "chart-4",
    },
  ];

  const keyLearnings = [
    {
      title: "Granularity vs. simplicity",
      description:
        "Striking the right balance between detailed control and ease of use was key.",
      number: "1",
    },
    {
      title: "Default + Custom approach",
      description:
        "Predefined roles gave clarity, custom roles gave flexibility.",
      number: "2",
    },
    {
      title: "Visibility builds trust",
      description:
        "The permission matrix and audit logs were the most valued features.",
      number: "3",
    },
  ];

  const futureOpportunities = [
    {
      title: "Cross-tenant Admin Portal",
      description:
        "Managing multiple organizations from a single interface",
      icon: Building,
      color: "primary",
    },
    {
      title: "Predictive Permissions",
      description:
        "AI recommendations for role setups based on usage patterns",
      icon: TrendingUp,
      color: "chart-2",
    },
    {
      title: "Enhanced Reporting",
      description:
        "Advanced analytics to track anomalies and optimize configurations",
      icon: BarChart3,
      color: "chart-3",
    },
  ];

  return (
    <main
      className="min-h-screen bg-background"
      role="main"
      aria-label="RBAC Peak.ai Case Study"
    >
      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50"
        tabIndex={0}
      >
        Skip to main content
      </a>

      {/* Hero Section */}
      <section
        id="main-content"
        className="relative pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 px-4 sm:px-6"
        role="banner"
        aria-labelledby="hero-title"
      >
        {/* Decorative Background Elements - hidden from screen readers and on mobile */}
        <div
          className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          {/* Large Gradient Orbs - Reduced opacity for better contrast */}
          <div className="hero-float-1 absolute top-16 right-16 w-60 lg:w-80 h-60 lg:h-80 bg-muted rounded-full blur-3xl opacity-20"></div>
          <div className="hero-float-2 absolute bottom-20 left-12 w-72 lg:w-96 h-72 lg:h-96 bg-accent rounded-full blur-2xl opacity-20"></div>

          {/* Medium Geometric Shapes - Reduced opacity */}
          <div className="hero-float-3 absolute top-1/3 right-1/4 w-24 lg:w-32 h-24 lg:h-32 bg-muted rounded-3xl opacity-15"></div>
          <div className="hero-float-1 absolute bottom-1/3 left-1/3 w-20 lg:w-28 h-20 lg:h-28 bg-accent rounded-2xl opacity-15"></div>

          {/* Small Accent Elements - Reduced opacity */}
          <div className="hero-float-4 absolute top-1/4 left-1/4 w-12 lg:w-16 h-12 lg:h-16 bg-muted rounded-full opacity-10"></div>
          <div className="hero-float-2 absolute top-3/4 right-1/3 w-10 lg:w-12 h-10 lg:h-12 bg-accent rounded-lg opacity-10"></div>
          <div className="hero-float-3 absolute top-1/2 right-1/2 w-16 lg:w-20 h-16 lg:h-20 bg-muted rounded-2xl opacity-10"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Navigation */}
          <nav
            className="mb-6 sm:mb-8"
            role="navigation"
            aria-label="Case study navigation"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigateTo("all-case-studies")}
              className="min-h-12 min-w-12 bg-background border-border hover:bg-muted text-sm sm:text-base"
              aria-label="Return to all case studies page"
            >
              <ArrowLeft
                className="h-4 w-4 mr-2"
                aria-hidden="true"
              />
              <span className="hidden xs:inline">
                All Case Studies
              </span>
              <span className="xs:hidden">Back</span>
            </Button>
          </nav>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Content Section */}
            <div className="lg:col-span-6 space-y-8">
              {/* Project Type Badge */}
              <Badge
                variant="outline"
                className="w-fit px-4 py-2"
              >
                Case Study
              </Badge>

              {/* Main Title Section */}
              <header className="space-y-8">
                <h1
                  id="hero-title"
                  className="text-4xl md:text-5xl font-bold leading-tight"
                >
                  Role Based Access Control - Peak.ai
                </h1>

                <h2 className="text-xl md:text-2xl text-foreground font-medium">
                  Redefining access management through
                  user-centered design.
                </h2>

                <p className="text-lg text-foreground max-w-2xl leading-relaxed">
                  A role-based access control system that
                  increased admin efficiency by 40%, reduced
                  access errors by 25%, and provided a scalable
                  framework for enterprise-grade security and
                  usability.
                </p>
              </header>

              {/* Project Tags */}
              <div
                className="flex flex-wrap gap-3"
                role="list"
                aria-label="Project categories"
              >
                <Badge
                  variant="outline"
                  className="px-4 py-2"
                  role="listitem"
                >
                  Enterprise UX
                </Badge>
                <Badge
                  variant="outline"
                  className="px-4 py-2"
                  role="listitem"
                >
                  Access Control
                </Badge>
                <Badge
                  variant="outline"
                  className="px-4 py-2"
                  role="listitem"
                >
                  Usability Testing
                </Badge>
                <Badge
                  variant="outline"
                  className="px-4 py-2"
                  role="listitem"
                >
                  Security & Compliance
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="min-h-12 py-3 flex items-center"
                  aria-describedby="view-prototype-desc"
                  onClick={() =>
                    window.open(
                      "https://www.figma.com/prototype/YOUR_PROTOTYPE_LINK",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  aria-label="View prototype (opens in new tab)"
                >
                  <FigmaIcon className="h-5 w-5 mr-2" />
                  View Prototype
                </Button>
                <span
                  id="view-process-desc"
                  className="sr-only"
                >
                  Navigate to the design process section
                </span>
              </div>
            </div>

            {/* Visual Section */}
            <div className="lg:col-span-6">
              <div className="relative max-w-lg mx-auto">
                {/* Main Device Mockup */}
                <figure className="aspect-[4/3] rounded-3xl overflow-hidden bg-muted border border-border shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1697382608786-bcf4c113b86e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGFjY2VzcyUyMGNvbnRyb2wlMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzU3MTc2OTYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Security access control dashboard interface showing role management and permissions matrix with enterprise design"
                    className="w-full h-full object-cover"
                  />
                </figure>

                {/* Stats Card */}
                <Card
                  className="absolute -bottom-8 -right-8 bg-card border border-border shadow-lg"
                  role="complementary"
                  aria-label="Key project metric"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center border border-border">
                        <Clock
                          className="h-6 w-6 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground font-medium">
                          Efficiency
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          +40%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Context */}
      <section
        className="px-4 sm:px-6 py-16 sm:py-20"
        aria-labelledby="context-heading"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {/* Context Header */}
            <header className="text-center">
              <Badge className="mb-6 px-4 py-2">
                <Globe className="h-4 w-4 mr-2" />
                Project Context
              </Badge>
              <h2
                id="context-heading"
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                🌍 Project Context
              </h2>
              <p className="text-foreground max-w-6xl mx-auto text-lg leading-relaxed">
                At Peak, as the platform scaled to serve
                multiple enterprise clients, the existing access
                control system became rigid and inconsistent.
                Admins struggled to manage complex permissions,
                while end users often found themselves confused
                about what they could or couldn't access.
              </p>
              <p className="text-foreground max-w-6xl mx-auto text-lg leading-relaxed mt-4">
                The goal of RBAC 2.0 was to create a scalable,
                granular, and user-friendly permissions system
                that would improve security, simplify admin
                tasks, and enhance clarity for end users.
              </p>
            </header>

            {/* Key Project Stats */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
              role="list"
              aria-label="Project key metrics and outcomes"
            >
              {/* Project Year - Consistent layout with icon and progress indicator */}
              <Card
                className="group relative overflow-hidden p-6 sm:p-8 bg-muted border-border hover:bg-accent transition-all duration-300 cursor-pointer"
                role="listitem"
                tabIndex={0}
                aria-label="Project completed in 2022"
              >
                <div
                  className="absolute top-0 left-0 w-full h-1 bg-primary"
                  aria-hidden="true"
                ></div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-border">
                    <Clock
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      2022
                    </div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                      Year
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-foreground font-medium">
                    Project Completed
                  </div>
                  <div className="w-full bg-background rounded-full h-2 border border-border">
                    <div
                      className="bg-primary h-2 rounded-full w-full"
                      role="progressbar"
                      aria-valuenow={100}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Project completion: 100%"
                    ></div>
                  </div>
                  <div className="text-muted-foreground">
                    6 months duration
                  </div>
                </div>
              </Card>

              {/* Team & Research - Enhanced with team composition */}
              <Card
                className="group relative overflow-hidden p-6 sm:p-8 bg-muted border-border hover:bg-accent transition-all duration-300 cursor-pointer"
                role="listitem"
                tabIndex={0}
                aria-label="Research conducted with 6 stakeholder interviews and 4-person core design team"
              >
                <div
                  className="absolute top-0 left-0 w-full h-1 bg-chart-2"
                  aria-hidden="true"
                ></div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-border">
                    <Users
                      className="h-6 w-6 text-chart-2"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-chart-2">
                      6
                    </div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                      Interviews
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-foreground font-medium">
                    Stakeholder Research
                  </div>
                  <div className="w-full bg-background rounded-full h-2 border border-border">
                    <div
                      className="bg-chart-2 h-2 rounded-full w-full"
                      role="progressbar"
                      aria-valuenow={100}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Research completion: 100%"
                    ></div>
                  </div>
                  <div className="text-muted-foreground">
                    4-person core team
                  </div>
                </div>
              </Card>

              {/* Testing & Validation - Enhanced with completion metrics */}
              <Card
                className="group relative overflow-hidden p-8 bg-muted border-border hover:bg-accent transition-all duration-300 cursor-pointer"
                role="listitem"
                tabIndex={0}
                aria-label="4 usability testing sessions completed with 85% success rate"
              >
                <div
                  className="absolute top-0 left-0 w-full h-1 bg-chart-3"
                  aria-hidden="true"
                ></div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-border">
                    <Activity
                      className="h-6 w-6 text-chart-3"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-chart-3">
                      4
                    </div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                      Tests
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-foreground font-medium">
                    Usability Sessions
                  </div>
                  <div className="w-full bg-background rounded-full h-2 border border-border">
                    <div
                      className="bg-chart-3 h-2 rounded-full w-[85%]"
                      role="progressbar"
                      aria-valuenow={85}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Testing success rate: 85%"
                    ></div>
                  </div>
                  <div className="text-muted-foreground">
                    85% success rate
                  </div>
                </div>
              </Card>

              {/* Impact & ROI - Comprehensive metrics showcase */}
              <Card
                className="group relative overflow-hidden p-8 bg-muted border-border hover:bg-accent transition-all duration-300 cursor-pointer"
                role="listitem"
                tabIndex={0}
                aria-label="Excellent results: 90% adoption rate, 40% admin efficiency, 25% error reduction"
              >
                <div
                  className="absolute top-0 left-0 w-full h-1 bg-chart-4"
                  aria-hidden="true"
                ></div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-border">
                    <Rocket
                      className="h-6 w-6 text-chart-4"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-right">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-bold text-chart-4">
                        90
                      </span>
                      <span className="text-lg font-medium text-chart-4">
                        %
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                      Adoption
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-foreground font-medium">
                    Key Impact Metrics
                  </div>

                  {/* Admin Efficiency */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Admin Efficiency
                      </span>
                      <span className="text-sm font-bold text-chart-4">
                        +40%
                      </span>
                    </div>
                    <div className="w-full bg-background rounded-full h-1 border border-border">
                      <div
                        className="bg-chart-4 h-1 rounded-full w-[40%]"
                        role="progressbar"
                        aria-valuenow={40}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Admin efficiency increase: 40%"
                      ></div>
                    </div>
                  </div>

                  {/* Error Reduction */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Error Reduction
                      </span>
                      <span className="text-sm font-bold text-chart-4">
                        -25%
                      </span>
                    </div>
                    <div className="w-full bg-background rounded-full h-1 border border-border">
                      <div
                        className="bg-chart-4 h-1 rounded-full w-1/4"
                        role="progressbar"
                        aria-valuenow={25}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Access error reduction: 25%"
                      ></div>
                    </div>
                  </div>

                  {/* Support Tickets */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Support Tickets
                      </span>
                      <span className="text-sm font-bold text-chart-4">
                        -35%
                      </span>
                    </div>
                    <div className="w-full bg-background rounded-full h-1 border border-border">
                      <div
                        className="bg-chart-4 h-1 rounded-full w-[35%]"
                        role="progressbar"
                        aria-valuenow={35}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Support ticket reduction: 35%"
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Role */}
      <section
        className="px-4 py-20 bg-muted/20"
        aria-labelledby="team-heading"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {/* Team Header */}
            <header className="text-center">
              <Badge className="mb-6 px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                Team Structure
              </Badge>
              <h2
                id="team-heading"
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                👥 Team & My Role
              </h2>
              <p className="text-foreground max-w-3xl mx-auto text-lg leading-relaxed">
                This was a product-focused project with close
                collaboration between design, security,
                engineering, and business operations teams.
              </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* My Role */}
              <Card className="p-8 bg-muted border-border">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center border border-border">
                    <UserCheck
                      className="h-8 w-8 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      My Role
                    </h3>
                    <p className="text-primary font-medium">
                      Lead UX Designer / Associate Product
                      Designer
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Conducted stakeholder workshops
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Defined user flows and permission models
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Designed prototypes for admin dashboards
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Led usability validation with enterprise
                      clients
                    </span>
                  </div>
                </div>
              </Card>

              {/* Team Members */}
              <Card className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center border border-border">
                    <Building
                      className="h-8 w-8 text-chart-2"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      Team Members
                    </h3>
                    <p className="text-muted-foreground font-medium">
                      Cross-functional collaboration
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Team Categories */}
                  <div>
                    <h4 className="font-medium mb-3 text-chart-2">
                      Research & Product
                    </h4>
                    <div className="space-y-2">
                      <div className="text-foreground">
                        <span className="font-medium">
                          Product Manager
                        </span>{" "}
                        – Product Strategy & Requirements
                      </div>
                      <div className="text-foreground">
                        <span className="font-medium">
                          Security Analyst
                        </span>{" "}
                        – Security & Compliance Requirements
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-chart-3">
                      Engineering Team
                    </h4>
                    <div className="text-foreground">
                      Backend & Frontend Engineers
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-chart-4">
                      Business & Operations
                    </h4>
                    <div className="text-foreground">
                      Client-facing analysts for enterprise
                      onboarding
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section
        className="px-4 py-24"
        aria-labelledby="challenge-heading"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-20">
            {/* Challenge Header */}
            <header className="text-center">
              <Badge className="mb-6 px-4 py-2 bg-destructive text-destructive-foreground border-destructive">
                <Target className="h-4 w-4 mr-2" />
                The Challenge
              </Badge>
              <h2
                id="challenge-heading"
                className="text-4xl md:text-5xl font-bold mb-8"
              >
                🎯 The Challenge
              </h2>
              <p className="text-foreground max-w-4xl mx-auto text-xl leading-relaxed">
                Enterprise customers and internal admins
                highlighted three major issues:
              </p>
            </header>

            {/* Challenge Cards */}
            <div
              className="grid lg:grid-cols-3 gap-8"
              role="list"
              aria-label="Identified challenges"
            >
              {challenges.map((challenge, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden bg-card border-border shadow-lg hover:shadow-2xl transition-all duration-500"
                  role="listitem"
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-2 bg-${challenge.color}`}
                  ></div>

                  <CardHeader className="relative pb-6 pt-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center border border-border">
                        <span className="text-2xl font-bold text-foreground">
                          {index + 1}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`font-medium border-${challenge.color} text-${challenge.color}`}
                      >
                        Critical
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      {challenge.title}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {challenge.subtitle}
                    </p>
                  </CardHeader>

                  <CardContent className="relative space-y-6">
                    <div className="bg-muted rounded-2xl p-6 border border-border">
                      <div className="flex items-baseline space-x-3 mb-2">
                        <span
                          className={`text-4xl font-bold text-${challenge.color}`}
                        >
                          {challenge.stat}
                        </span>
                        <div className="text-muted-foreground">
                          <div className="font-medium">
                            {challenge.statLabel}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-foreground leading-relaxed">
                      {challenge.description}
                    </p>

                    <p className="text-foreground leading-relaxed font-medium">
                      💡 {challenge.impact}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Combined Impact */}
            <div className="bg-destructive/5 rounded-3xl p-16 border-2 border-destructive/20">
              <div className="text-center space-y-12">
                <h3 className="text-2xl font-bold text-foreground">
                  Combined Impact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold text-destructive">
                      85%
                    </div>
                    <p className="text-lg text-foreground font-medium">
                      Security Gaps
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold text-destructive">
                      70%
                    </div>
                    <p className="text-lg text-foreground font-medium">
                      High Admin Effort
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold text-destructive">
                      65%
                    </div>
                    <p className="text-lg text-foreground font-medium">
                      Poor End-User Clarity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Discovery */}
      <section
        className="px-4 py-24 bg-muted/20"
        aria-labelledby="research-heading"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {/* Research Header */}
            <header className="text-center">
              <Badge className="mb-6 px-4 py-2">
                <Search className="h-4 w-4 mr-2" />
                Research & Discovery
              </Badge>
              <h2
                id="research-heading"
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                🔍 Research & Discovery
              </h2>
              <p className="text-foreground max-w-3xl mx-auto text-lg leading-relaxed">
                To ensure the new system addressed real-world
                needs, we conducted:
              </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Research Methods */}
              <div className="space-y-8">
                <Card className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center border border-border">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-foreground">
                        Research Methods
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">
                        6 stakeholder interviews with enterprise
                        IT managers & internal admins
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">
                        4 usability sessions testing early
                        permission prototypes
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">
                        Workflow mapping of user and admin
                        journeys
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">
                        Benchmarking against AWS IAM, Azure AD,
                        and Google Workspace
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Key Insight Card */}
                <Card className="p-8 bg-muted border border-primary">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center flex-shrink-0 border border-border">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">
                        Key Insight:
                      </h4>
                      <blockquote className="text-foreground italic">
                        "I just want to see, at a glance, who
                        has access to what — and change it in
                        one click."
                      </blockquote>
                      <cite className="text-sm text-primary font-medium mt-2 block">
                        – Enterprise IT Admin
                      </cite>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Research Visualization */}
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1563457012475-13cf086fd600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVhbSUyMG1lZXRpbmclMjByZXNlYXJjaCUyMHNlc3Npb258ZW58MXx8fHwxNTc3MTAwNzcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Enterprise team meeting and stakeholder research session"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section
        className="px-4 py-24"
        aria-labelledby="process-heading"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-16">
            {/* Process Header */}
            <header className="text-center">
              <Badge className="mb-6 px-4 py-2">
                <Layers className="h-4 w-4 mr-2" />
                Design Process
              </Badge>
              <h2
                id="process-heading"
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                🛠 Design Process
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
                We followed a structured design methodology:
              </p>
            </header>

            {/* Process Steps */}
            <div className="space-y-8">
              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-5 gap-6 items-stretch">
                {designPhases.map((phase, index) => {
                  const Icon = phase.icon;

                  return (
                    <div
                      key={index}
                      className="text-center flex"
                    >
                      <Card className="p-6 border-border h-full flex flex-col w-full">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-muted text-primary flex items-center justify-center border border-border">
                          <Icon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="space-y-2 flex flex-col flex-grow">
                          <div className="text-muted-foreground font-medium">
                            {index + 1}
                          </div>
                          <h3 className="font-medium text-foreground">
                            {phase.title}
                          </h3>
                          <p className="text-foreground flex-grow">
                            {phase.description}
                          </p>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>

              {/* Mobile List */}
              <div className="md:hidden space-y-4">
                {designPhases.map((phase, index) => {
                  const Icon = phase.icon;

                  return (
                    <Card
                      key={index}
                      className="p-6 border-border"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-muted text-primary flex items-center justify-center flex-shrink-0 border border-border">
                          <Icon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground font-medium">
                              {index + 1}
                            </span>
                            <h3 className="font-medium text-foreground">
                              {phase.title}
                            </h3>
                          </div>
                          <p className="text-foreground">
                            {phase.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Solutions */}
      <section
        className="px-4 py-24 bg-muted"
        aria-labelledby="solutions-heading"
      >
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-20">
            {/* Solutions Header */}
            <header className="text-center">
              <Badge className="mb-6 px-4 py-2 bg-primary text-primary-foreground border-primary">
                <Lightbulb className="h-4 w-4 mr-2" />
                Design Solutions
              </Badge>
              <h2
                id="solutions-heading"
                className="text-4xl md:text-5xl font-bold mb-8"
              >
                💡 Design Solutions
              </h2>
            </header>

            {/* Solutions Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;

                return (
                  <Card
                    key={index}
                    className="relative overflow-hidden p-8 bg-background border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start space-x-6">
                      <div
                        className={`w-16 h-16 bg-${solution.color}/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-${solution.color}/20`}
                      >
                        <Icon
                          className={`h-8 w-8 text-${solution.color}`}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="space-y-4 flex-1">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">
                            {solution.title}
                          </h3>
                          <Badge
                            className="mb-4"
                            variant="outline"
                          >
                            Core Feature
                          </Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {solution.description}
                        </p>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            <strong>Impact:</strong>{" "}
                            {solution.impact}
                          </p>
                          <p className="text-sm font-medium text-primary">
                            {solution.result}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Results */}
      <section
        className="px-4 py-24"
        aria-labelledby="impact-heading"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {/* Impact Header */}
            <header className="text-center">
              <Badge className="mb-6 px-4 py-2">
                <TrendingUp className="h-4 w-4 mr-2" />
                Measurable Impact
              </Badge>
              <h2
                id="impact-heading"
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                📊 Impact
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
                The new RBAC system was validated through pilot
                testing and enterprise feedback:
              </p>
            </header>

            {/* Impact Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  40%
                </div>
                <div className="text-muted-foreground mb-3">
                  increase in admin efficiency
                </div>
              </Card>

              <Card className="p-8 text-center bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-chart-3/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-chart-3" />
                </div>
                <div className="text-4xl font-bold text-chart-3 mb-2">
                  25%
                </div>
                <div className="text-muted-foreground mb-3">
                  reduction in access errors
                </div>
              </Card>

              <Card className="p-8 text-center bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-chart-2/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-chart-2" />
                </div>
                <div className="text-4xl font-bold text-chart-2 mb-2">
                  90%
                </div>
                <div className="text-muted-foreground mb-3">
                  enterprise adoption rate
                </div>
              </Card>

              <Card className="p-8 text-center bg-gradient-to-br from-chart-4/5 to-chart-4/10 border-chart-4/20 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-chart-4/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-8 w-8 text-chart-4" />
                </div>
                <div className="text-4xl font-bold text-chart-4 mb-2">
                  35%
                </div>
                <div className="text-muted-foreground mb-3">
                  reduction in support tickets
                </div>
              </Card>
            </div>

            {/* User Feedback */}
            <Card className="p-8">
              <h3 className="text-xl font-medium mb-8 flex items-center">
                <Star className="h-5 w-5 mr-2 text-primary" />
                Enterprise Feedback
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <blockquote className="border-l-4 border-primary pl-4">
                  <p className="text-muted-foreground italic mb-2">
                    "The permission matrix makes it so easy to
                    understand who has access to what. Game
                    changer."
                  </p>
                  <cite className="text-sm">
                    – IT Director, Fortune 500
                  </cite>
                </blockquote>

                <blockquote className="border-l-4 border-chart-2 pl-4">
                  <p className="text-muted-foreground italic mb-2">
                    "Custom roles finally let us match our
                    actual org structure. No more workarounds."
                  </p>
                  <cite className="text-sm">
                    – Security Admin, Tech Startup
                  </cite>
                </blockquote>

                <blockquote className="border-l-4 border-chart-3 pl-4">
                  <p className="text-muted-foreground italic mb-2">
                    "The audit trail gives us complete
                    visibility for compliance. Exactly what we
                    needed."
                  </p>
                  <cite className="text-sm">
                    – Compliance Officer, FinTech
                  </cite>
                </blockquote>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Learnings & Next Steps */}
      <section
        className="px-4 py-24 bg-muted/30"
        aria-labelledby="learnings-heading"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Key Learnings */}
            <div>
              <header className="mb-8">
                <Badge className="mb-4 px-4 py-2">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Key Insights
                </Badge>
                <h2
                  id="learnings-heading"
                  className="text-3xl font-bold"
                >
                  📚 Key Learnings
                </h2>
              </header>

              <div className="space-y-6">
                {keyLearnings.map((learning, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold text-sm">
                          {learning.number}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">
                          {learning.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {learning.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* What's Next */}
            <div>
              <header className="mb-8">
                <Badge className="mb-4 px-4 py-2">
                  <Rocket className="h-4 w-4 mr-2" />
                  Future Vision
                </Badge>
                <h2 className="text-3xl font-bold">
                  🚀 What's Next
                </h2>
              </header>

              <div className="space-y-6">
                {futureOpportunities.map(
                  (opportunity, index) => {
                    const Icon = opportunity.icon;

                    return (
                      <Card
                        key={index}
                        className={`p-6 bg-gradient-to-br from-${opportunity.color}/5 to-transparent border-${opportunity.color}/20`}
                      >
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-12 h-12 bg-${opportunity.color}/10 rounded-xl flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon
                              className={`h-6 w-6 text-${opportunity.color}`}
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">
                              {opportunity.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {opportunity.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          {/* Project Showcase Summary */}
        </div>
      </section>

      {/* Navigation Footer */}
      <footer
        className="px-4 py-16 border-t border-border"
        role="contentinfo"
        aria-label="Case study navigation"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigateTo("all-case-studies")}
              className="min-h-12 bg-background border-border hover:bg-muted"
              aria-label="Return to all case studies"
            >
              <ArrowLeft
                className="h-4 w-4 mr-2"
                aria-hidden="true"
              />
              All Case Studies
            </Button>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigateTo("case-study-1")}
                className="min-h-12 bg-background border-border hover:bg-muted"
                aria-label="View Analytics Central case study"
              >
                <ArrowLeft
                  className="h-4 w-4 ml-2"
                  aria-hidden="true"
                />
                Analytics Central
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigateTo("case-study-3")}
                className="min-h-12 bg-background border-border hover:bg-muted"
                aria-label="View Flowsheets case study"
              >
                Flowsheets
                <ArrowRight
                  className="h-4 w-4 ml-2"
                  aria-hidden="true"
                />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}