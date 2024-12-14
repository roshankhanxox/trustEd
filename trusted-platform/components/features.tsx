import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, Shield, FileText } from 'lucide-react'

const features = [
  {
    title: "Instant QR Code Generation",
    description: "Generate secure QR codes for your credentials in seconds.",
    icon: QrCode,
  },
  {
    title: "Secure Credential Verification",
    description: "Verify credentials with our advanced blockchain technology.",
    icon: Shield,
  },
  {
    title: "Easy Access to Verified Documents",
    description: "Access and share your verified documents anytime, anywhere.",
    icon: FileText,
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            A better way to verify credentials
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            TrustEd provides cutting-edge features to make credential verification simple and secure.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

