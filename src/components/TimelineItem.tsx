import { montserrat } from './Process'

/**
 * Timeline item component for displaying process steps in a timeline format
 */
interface TimelineItemProps {
  item: {
    number: string;
    title: string;
    description: string;
  };
  index: number;
  total: number;
}

export function TimelineItem({ item, index, total }: TimelineItemProps) {
  return (
    <div className="flex items-start gap-4">
      {/* Timeline connector line */}
      <div className="flex-shrink-0 mt-2">
        {/* Top connector (except for first item) */}
        {index > 0 && (
          <div className="w-px h-2 mx-1.25 bg-[var(--figma-border)]" />
        )}
        {/* Main point */}
        <div className="w-3 h-3 rounded-full bg-[var(--figma-blue)] mt-1" />
        {/* Bottom connector (except for last item) */}
        {index < total - 1 && (
          <div className="w-px h-2 mx-1.25 bg-[var(--figma-border)]" />
        )}
      </div>

      {/* Timeline content */}
      <div className="flex-1">
        <h3 className="text-lg mb-2 tracking-tight" style={{ ...montserrat, fontWeight: 700 }}>
          <span className="mr-2 text-sm font-black" style={{ color: 'var(--figma-blue)' }}>{item.number}</span>
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}