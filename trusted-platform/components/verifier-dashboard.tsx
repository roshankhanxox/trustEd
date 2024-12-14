import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function VerifierDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Verifier Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Verify Credentials</CardTitle>
            <CardDescription>Scan or input credential information to verify</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Start Verification</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Verification Logs</CardTitle>
            <CardDescription>View your recent verification activities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You have verified 10 credentials this month.</p>
            <Button>View Logs</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

