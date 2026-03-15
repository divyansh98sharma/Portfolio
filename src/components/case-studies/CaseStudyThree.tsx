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
  Stethoscope,
  Monitor,
  Timer,
  LineChart,
  AlertTriangle,
  Download,
  Printer,
  MessageSquare,
  MousePointer,
  Layout,
  RefreshCw,
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

export function CaseStudyThree() {
  const { navigateTo } = useRouter();

  const designPhases = [
    {
      title: "Discovery",
      icon: Search,
      description:
        "Analyzed workflows and collected provider feedback on interface issues",
    },
    {
      title: "Define",
      icon: Target,
      description:
        "Identified opportunities for visual clarity, navigation efficiency, and favorites",
    },
    {
      title: "Ideate",
      icon: Lightbulb,
      description:
        "Explored solutions for table layout, action integration, and workflow optimization",
    },
    {
      title: "Prototype",
      icon: Smartphone,
      description:
        "Built Figma prototypes for improved UI and enhanced user workflows",
    },
    {
      title: "Test & Iterate",
      icon: CheckCircle,
      description:
        "Validated designs with providers and refined for clinical workflows",
    },
  ];

  const teamMembers = [
    {
      name: "Brian Prue",
      role: "Manager & Researcher",
      type: "product",
    },
    {
      name: "Morgan Compart",
      role: "Business Goals & Task Alignment",
      type: "security",
    },
    { name: "Bharat Kumar", role: "Developer", type: "dev" },
    { name: "Kunal Wagh", role: "Developer", type: "dev" },
    {
      name: "Parth Devani",
      role: "Developer",
      type: "analyst",
    },
    {
      name: "Spencer Lederer",
      role: "Developer",
      type: "business",
    },
  ];

  const challenges = [
    {
      title: "Poor Visual Hierarchy",
      subtitle: "Cluttered data presentation",
      description:
        "Dense table layout made it difficult to scan patient data efficiently.",
      impact:
        "Result: Providers struggled to find critical information quickly during care.",
      stat: "Dense",
      statLabel: "Layout",
      color: "destructive",
    },
    {
      title: "Inefficient Navigation",
      subtitle: "Cumbersome interaction patterns",
      description:
        "Multiple clicks required to access common actions and favorites.",
      impact:
        "Result: Slowed clinical workflows and increased task completion time.",
      stat: "Multiple",
      statLabel: "Clicks",
      color: "chart-2",
    },
    {
      title: "Limited Functionality",
      subtitle: "Missing workflow features",
      description:
        "Lack of integrated actions and favorites made common tasks cumbersome.",
      impact:
        "Result: Providers had to switch between multiple windows frequently.",
      stat: "Missing",
      statLabel: "Features",
      color: "chart-4",
    },
  ];

  const solutions = [
    {
      title: "Redesigned Table Layout",
      description:
        "Improved spacing, typography, and visual hierarchy for better readability",
      impact:
        "Enhanced data scanning and reduced cognitive load for providers",
      result: "Clearer patient data presentation",
      icon: Layout,
      color: "primary",
    },
    {
      title: "Integrated Action Buttons",
      description:
        "Embedded common actions directly within the flowsheet interface",
      impact:
        "Streamlined workflows by reducing navigation overhead",
      result: "Faster access to critical functions",
      icon: MousePointer,
      color: "chart-2",
    },
    {
      title: "Favorites & Quick Access",
      description:
        "Added favoriting system for frequently used flowsheets and quick filters",
      impact:
        "Personalized experience tailored to provider preferences",
      result: "Improved efficiency for routine tasks",
      icon: Star,
      color: "chart-3",
    },
    {
      title: "Enhanced Usability Features",
      description:
        "Text wrapping, consistent icons, and improved visual feedback",
      impact:
        "Better overall user experience and reduced learning curve",
      result: "More intuitive interface design",
      icon: Eye,
      color: "chart-4",
    },
  ];

  const keyLearnings = [
    {
      title: "Clinical context is paramount",
      description:
        "Healthcare interfaces must prioritize patient safety and clinical efficiency over aesthetic preferences.",
      number: "1",
    },
    {
      title: "Incremental improvements matter",
      description:
        "Small UI enhancements can significantly impact daily workflows when compounded across multiple users.",
      number: "2",
    },
    {
      title: "Provider feedback drives success",
      description:
        "Direct input from clinicians ensures solutions address real workflow pain points effectively.",
      number: "3",
    },
  ];

  const futureOpportunities = [
    {
      title: "Smart Data Insights",
      description:
        "AI-powered suggestions for workflow optimization based on usage patterns",
      icon: TrendingUp,
      color: "primary",
    },
    {
      title: "Mobile Responsiveness",
      description:
        "Optimized interface for tablet and mobile access during bedside care",
      icon: Smartphone,
      color: "chart-2",
    },
    {
      title: "Advanced Filtering",
      description:
        "Enhanced search and filter capabilities for complex patient data queries",
      icon: Search,
      color: "chart-3",
    },
  ];

  return (
    <main
      className="min-h-screen bg-background"
      role="main"
      aria-label="Flowsheets eClinicalWorks Case Study"
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
                  Flowsheets – eClinicalWorks
                </h1>

                <h2 className="text-xl md:text-2xl text-foreground font-medium">
                  Transforming clinical data management through
                  intuitive design.
                </h2>

                <p className="text-lg text-foreground max-w-2xl leading-relaxed">
                  A redesigned Flowsheets window that improved
                  visibility of patient progress, streamlined
                  documentation, and enhanced provider workflows
                  through a modernized UI.
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
                  Healthcare UX
                </Badge>
                <Badge
                  variant="outline"
                  className="px-4 py-2"
                  role="listitem"
                >
                  Workflow Optimization
                </Badge>
                <Badge
                  variant="outline"
                  className="px-4 py-2"
                  role="listitem"
                >
                  EHR Usability
                </Badge>
                <Badge
                  variant="outline"
                  className="px-4 py-2"
                  role="listitem"
                >
                  Interface Redesign
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
                    src="https://images.unsplash.com/photo-1698306642516-9841228dcff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcGF0aWVudCUyMG1vbml0b3JpbmclMjBmbG93c2hlZXQlMjBpbnRlcmZhY2UlMjBjbGluaWNhbCUyMGRhdGF8ZW58MXx8fHwxNzU4OTgwNzIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Healthcare flowsheets interface showing patient monitoring data with clinical design elements"
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
                        <Zap
                          className="h-6 w-6 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground font-medium">
                          Efficiency
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          +35%
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
                At eClinicalWorks, the existing Flowsheets
                interface presented significant usability
                challenges that hindered clinical efficiency and
                provider satisfaction in day-to-day healthcare
                operations.
              </p>
              <p className="text-foreground max-w-6xl mx-auto text-lg leading-relaxed mt-4">
                The goal was to redesign the Flowsheets window
                to improve visual hierarchy, enhance navigation
                patterns, and integrate essential workflow
                features to streamline provider tasks.
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
                aria-label="Project completed in 2024"
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
                      2024
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
                aria-label="Research conducted with provider feedback and 6-person core design team"
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
                      Team
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-foreground font-medium">
                    Provider Research
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
                    6-person core team
                  </div>
                </div>
              </Card>

              {/* Testing & Validation - Enhanced with completion metrics */}
              <Card
                className="group relative overflow-hidden p-8 bg-muted border-border hover:bg-accent transition-all duration-300 cursor-pointer"
                role="listitem"
                tabIndex={0}
                aria-label="Provider feedback sessions completed with positive validation"
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
                      12
                    </div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                      Tests
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-foreground font-medium">
                    Provider Validation
                  </div>
                  <div className="w-full bg-background rounded-full h-2 border border-border">
                    <div
                      className="bg-chart-3 h-2 rounded-full w-[95%]"
                      role="progressbar"
                      aria-valuenow={95}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Testing success rate: 95%"
                    ></div>
                  </div>
                  <div className="text-muted-foreground">
                    95% positive feedback
                  </div>
                </div>
              </Card>

              {/* Impact & ROI - Comprehensive metrics showcase */}
              <Card
                className="group relative overflow-hidden p-8 bg-muted border-border hover:bg-accent transition-all duration-300 cursor-pointer"
                role="listitem"
                tabIndex={0}
                aria-label="Excellent results: Improved clarity, enhanced efficiency, streamlined workflows"
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
                        +
                      </span>
                      <span className="text-lg font-medium text-chart-4">
                        UX
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                      Impact
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-foreground font-medium">
                    Key Impact Areas
                  </div>

                  {/* Visual Clarity */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Visual Clarity
                      </span>
                      <span className="text-sm font-bold text-chart-4">
                        Enhanced
                      </span>
                    </div>
                    <div className="w-full bg-background rounded-full h-1 border border-border">
                      <div
                        className="bg-chart-4 h-1 rounded-full w-[90%]"
                        role="progressbar"
                        aria-valuenow={90}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Visual clarity improvement: 90%"
                      ></div>
                    </div>
                  </div>

                  {/* Workflow Efficiency */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Workflow Efficiency
                      </span>
                      <span className="text-sm font-bold text-chart-4">
                        Improved
                      </span>
                    </div>
                    <div className="w-full bg-background rounded-full h-1 border border-border">
                      <div
                        className="bg-chart-4 h-1 rounded-full w-[85%]"
                        role="progressbar"
                        aria-valuenow={85}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Workflow efficiency improvement: 85%"
                      ></div>
                    </div>
                  </div>

                  {/* Provider Satisfaction */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Provider Satisfaction
                      </span>
                      <span className="text-sm font-bold text-chart-4">
                        High
                      </span>
                    </div>
                    <div className="w-full bg-background rounded-full h-1 border border-border">
                      <div
                        className="bg-chart-4 h-1 rounded-full w-[95%]"
                        role="progressbar"
                        aria-valuenow={95}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Provider satisfaction: 95%"
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
                This was a design-focused project with close
                collaboration between UX design, development,
                and clinical stakeholder teams.
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
                      UX Designer
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Led interface redesign and visual
                      hierarchy improvements
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Conducted provider feedback sessions and
                      workflow analysis
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Created prototypes and design
                      specifications
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Collaborated on usability testing and
                      iteration
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
                      Management & Research
                    </h4>
                    <div className="space-y-2">
                      <div className="text-foreground">
                        <span className="font-medium">
                          Brian Prue
                        </span>{" "}
                        – Manager & Researcher
                      </div>
                      <div className="text-foreground">
                        <span className="font-medium">
                          Morgan Compart
                        </span>{" "}
                        – Business Goals & Task Alignment
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-chart-3">
                      Development Team
                    </h4>
                    <div className="text-foreground">
                      Bharat Kumar, Kunal Wagh, Parth Devani,
                      Spencer Lederer
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-chart-4">
                      Clinical Stakeholders
                    </h4>
                    <div className="text-foreground">
                      Healthcare providers and clinical workflow
                      experts
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
                🚨 The Challenge
              </h2>
              <p className="text-foreground max-w-4xl mx-auto text-xl leading-relaxed">
                Healthcare providers and clinical stakeholders
                highlighted three major interface issues:
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
                      Poor
                    </div>
                    <p className="text-lg text-foreground font-medium">
                      Visual Hierarchy
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold text-destructive">
                      Slow
                    </div>
                    <p className="text-lg text-foreground font-medium">
                      Navigation Patterns
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold text-destructive">
                      Limited
                    </div>
                    <p className="text-lg text-foreground font-medium">
                      Workflow Features
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
                To ensure the new design addressed real-world
                clinical needs, we conducted:
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
                        Provider feedback sessions across
                        multiple specialties
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">
                        Workflow mapping of current flowsheet
                        usage patterns
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">
                        User story collection from clinical
                        stakeholders
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">
                        Benchmarking against modern EHR
                        interface standards
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
                        "I need Flowsheets to show me patient
                        progress clearly and let me act quickly
                        without jumping between screens."
                      </blockquote>
                      <cite className="text-sm text-primary font-medium mt-2 block">
                        – Healthcare Provider
                      </cite>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Research Visualization */}
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVhbSUyMG1lZXRpbmclMjByZXNlYXJjaCUyMHNlc3Npb258ZW58MXx8fHwxNTc3MTAwNzcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Healthcare team meeting and provider research session in clinical setting"
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
                The redesigned Flowsheets interface was
                validated through provider feedback and testing:
              </p>
            </header>

            {/* Impact Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">
                  Enhanced
                </div>
                <div className="text-muted-foreground mb-3">
                  visual clarity and readability
                </div>
              </Card>

              <Card className="p-8 text-center bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-chart-3/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-chart-3" />
                </div>
                <div className="text-4xl font-bold text-chart-3 mb-2">
                  Improved
                </div>
                <div className="text-muted-foreground mb-3">
                  workflow efficiency
                </div>
              </Card>

              <Card className="p-8 text-center bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-chart-2/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-chart-2" />
                </div>
                <div className="text-4xl font-bold text-chart-2 mb-2">
                  Positive
                </div>
                <div className="text-muted-foreground mb-3">
                  provider feedback
                </div>
              </Card>

              <Card className="p-8 text-center bg-gradient-to-br from-chart-4/5 to-chart-4/10 border-chart-4/20 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-chart-4/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-chart-4" />
                </div>
                <div className="text-4xl font-bold text-chart-4 mb-2">
                  Better
                </div>
                <div className="text-muted-foreground mb-3">
                  clinical workflows
                </div>
              </Card>
            </div>

            {/* User Feedback */}
            <Card className="p-8">
              <h3 className="text-xl font-medium mb-8 flex items-center">
                <Star className="h-5 w-5 mr-2 text-primary" />
                Provider Feedback
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <blockquote className="border-l-4 border-primary pl-4">
                  <p className="text-muted-foreground italic mb-2">
                    "The redesigned table layout makes it so
                    much easier to quickly scan patient data
                    during rounds."
                  </p>
                  <cite className="text-sm">
                    – Primary Care Physician
                  </cite>
                </blockquote>

                <blockquote className="border-l-4 border-chart-2 pl-4">
                  <p className="text-muted-foreground italic mb-2">
                    "Having favorites and integrated actions
                    saves me so much time. Much more efficient
                    workflow."
                  </p>
                  <cite className="text-sm">
                    – Nurse Practitioner
                  </cite>
                </blockquote>

                <blockquote className="border-l-4 border-chart-3 pl-4">
                  <p className="text-muted-foreground italic mb-2">
                    "The improved UI makes documentation feel
                    less cumbersome. Great usability
                    improvements."
                  </p>
                  <cite className="text-sm">
                    – Specialist Provider
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
                onClick={() => navigateTo("case-study-2")}
                className="min-h-12 bg-background border-border hover:bg-muted"
                aria-label="View RBAC case study"
              >
                <ArrowLeft
                  className="h-4 w-4 ml-2"
                  aria-hidden="true"
                />
                RBAC
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigateTo("case-study-1")}
                className="min-h-12 bg-background border-border hover:bg-muted"
                aria-label="View Analytics Central case study"
              >
                Analytics Central
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