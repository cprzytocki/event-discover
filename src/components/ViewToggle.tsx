import { LayoutGridIcon, ListIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Layout } from "@/types/layout";

interface TableViewProps {
    layout: Layout;
    setLayout: (layout: Layout) => void;
}

export default function ViewToggle({layout, setLayout}: TableViewProps) {
    return <div className="flex items-center gap-4 ml-auto">
      <Card className="flex items-center gap-4">
        <Button variant={layout === Layout.GRID ? "default" : "outline"} onClick={() => setLayout(Layout.GRID)}>
          <LayoutGridIcon className="w-4 h-4" />
          <span className="sr-only">Grid View</span>
        </Button>
        <Button variant={layout === Layout.LIST ? "default" : "outline"} onClick={() => setLayout(Layout.LIST)}>
          <ListIcon className="w-4 h-4" />
          <span className="sr-only">List View</span>
        </Button>
      </Card>
    </div>
  }
