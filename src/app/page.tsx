import GridNavigation from "@/components/GridNav";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-foreground">Home</CardTitle>
        </CardHeader>
        <CardContent>
          <GridNavigation columns={2} />
        </CardContent>
      </Card>
    </div>
  );
}