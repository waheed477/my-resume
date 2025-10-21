import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import personalData from "@/data/personal.json";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const { personalInfo, socialLinks } = personalData;
  
  const form = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleSubmit = (data: ContactFormData) => {
    // Simple client-side form handling
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    form.reset();
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: personalInfo.email },
    { icon: Phone, label: "Phone", value: personalInfo.phone },
    { icon: MapPin, label: "Location", value: personalInfo.location },
  ];

  const socialLinksData = [
    { icon: Github, label: "GitHub", url: socialLinks.github },
    { icon: Linkedin, label: "LinkedIn", url: socialLinks.linkedin },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-4" data-testid="text-contact-title">
          Let's Work Together
        </h2>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Have a project in mind or just want to chat? Feel free to reach out.
        </p>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 md:p-8">
            <h3 className="text-2xl font-semibold mb-6" data-testid="text-form-title">
              Send a Message
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your Name"
                      data-testid="input-name"
                      {...form.register("name", { required: "Name is required" })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      data-testid="input-email"
                      {...form.register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Your Message"
                      rows={5}
                      data-testid="input-message"
                      {...form.register("message", { 
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters"
                        }
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <Button type="submit" className="w-full" data-testid="button-submit">
                  Send Message
                </Button>
              </form>
            </Form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 md:p-8">
              <h3 className="text-2xl font-semibold mb-6" data-testid="text-contact-info-title">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-4" data-testid={`contact-info-${index}`}>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium" data-testid={`text-contact-value-${index}`}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <h3 className="text-2xl font-semibold mb-6" data-testid="text-social-title">
                Social Links
              </h3>
              <div className="flex gap-4">
                {socialLinksData.map((link, index) => (
                  <Button
                    key={index}
                    size="icon"
                    variant="outline"
                    className="h-12 w-12"
                    onClick={() => window.open(link.url, "_blank")}
                    data-testid={`button-social-${index}`}
                  >
                    <link.icon className="h-6 w-6" />
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}