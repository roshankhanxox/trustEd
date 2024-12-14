import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function StudentDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Credentials</CardTitle>
            <CardDescription>View and manage your verified credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You have 3 verified credentials.</p>
            <Button>View Credentials</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generate QR Code</CardTitle>
            <CardDescription>Create a QR code for quick credential verification</CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Generate QR Code</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

