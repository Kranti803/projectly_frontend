import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
  { value: "board", label: "Board", enabled: true },
  { value: "list", label: "List", enabled: false },
  { value: "calendar", label: "Calendar", enabled: false },
  { value: "activity", label: "Activity", enabled: false },
]

// Enable a tab by flipping `enabled` once its view exists.
export function ProjectTabs() {
  return (
    <Tabs defaultValue="board">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} disabled={!tab.enabled}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}