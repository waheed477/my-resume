import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import personalData from "@/data/personal.json";
import { FORMSPREE_ENDPOINT, FALLBACK_EMAIL } from "@/config/contact";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const { toast } = useToast();
  const { personalInfo, socialLinks } = personalData;
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const form = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const openFallbackMail = (data: ContactFormData) => {
    const subject = encodeURIComponent(
      `Portfolio contact from ${data.name}`
    );
    const body = encodeURIComponent(
      `From: ${data.name} <${data.email}>\n\n${data.message}`
    );
    window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (data: ContactFormData) => {
    setSubmitState("submitting");

    // ── Path A: Formspree configured → real submission ─────────────
    if (FORMSPREE_ENDPOINT) {
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
            _subject: `Portfolio contact from ${data.name}`,
          }),
        });

        if (response.ok) {
          setSubmitState("success");
          toast({
            title: "Message sent!",
            description: "Thanks for reaching out. I'll get back to you soon.",
          });
          form.reset();
          setTimeout(() => setSubmitState("idle"), 4000);
          return;
        }
        throw new Error("Formspree responded non-OK");
      } catch {
        setSubmitState("error");
        toast({
          variant: "destructive",
          title: "Couldn't reach the server",
          description:
            "I'll open your mail client instead so the message still gets through.",
        });
        openFallbackMail(data);
        setTimeout(() => setSubmitState("idle"), 4000);
        return;
      }
    }

    // ── Path B: Not configured → open user's mail client ───────────
    setSubmitState("success");
    toast({
      title: "Opening your mail client…",
      description:
        "Form backend isn't configured yet — your mail app will send the message.",
    });
    openFallbackMail(data);
    form.reset();
    setTimeout(() => setSubmitState("idle"), 4000);
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
        <h2
          className="font-serif text-3xl md:text-4xl font-semibold text-center mb-4"
          data-testid="text-contact-title"
        >
          Let's Work Together
        </h2>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Have a project in mind or just want to chat? Feel free to reach out.
        </p>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6 md:p-8">
            <h3
              className="text-2xl font-semibold mb-6"
              data-testid="text-form-title"
            >
              Send a Message
            </h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
                noValidate
              >
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your Name"
                      autoComplete="name"
                      disabled={submitState === "submitting"}
                      data-testid="input-name"
                      {...form.register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Please enter your full name",
                        },
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      autoComplete="email"
                      disabled={submitState === "submitting"}
                      data-testid="input-email"
                      {...form.register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
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
                      disabled={submitState === "submitting"}
                      data-testid="input-message"
                      {...form.register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 10,
                          message: "Message must be at least 10 characters",
                        },
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                {/* Honeypot for spam bots */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden="true"
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitState === "submitting"}
                  data-testid="button-submit"
                >
                  {submitState === "submitting" && (
                    <>
                      <Loader2
                        className="h-4 w-4 mr-2 animate-spin"
                        aria-hidden="true"
                      />
                      Sending…
                    </>
                  )}
                  {submitState === "success" && (
                    <>
                      <CheckCircle2
                        className="h-4 w-4 mr-2"
                        aria-hidden="true"
                      />
                      Sent!
                    </>
                  )}
                  {submitState === "error" && (
                    <>
                      <AlertCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                      Try again
                    </>
                  )}
                  {submitState === "idle" && "Send Message"}
                </Button>

                {!FORMSPREE_ENDPOINT && (
                  <p
                    className="text-xs text-muted-foreground text-center pt-1"
                    data-testid="text-form-fallback-note"
                  >
                    ⚠ Form backend not configured — submit will open your
                    mail client.{" "}
                    <a
                      href={`https://github.com/waheed477/my-resume/blob/main/client/src/config/contact.ts`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-primary"
                    >
                      See setup
                    </a>
                    .
                  </p>
                )}
              </form>
            </Form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 md:p-8">
              <h3
                className="text-2xl font-semibold mb-6"
                data-testid="text-contact-info-title"
              >
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                    data-testid={`contact-info-${index}`}
                  >
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p
                        className="font-medium"
                        data-testid={`text-contact-value-${index}`}
                      >
                        {item.label === "Email" ? (
                          <a
                            href={`mailto:${item.value}`}
                            className="hover:text-primary transition"
                          >
                            {item.value}
                          </a>
                        ) : item.label === "Phone" ? (
                          <a
                            href={`tel:${item.value.replace(/\s+/g, "")}`}
                            className="hover:text-primary transition"
                          >
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <h3
                className="text-2xl font-semibold mb-6"
                data-testid="text-social-title"
              >
                Connect
              </h3>
              <div className="flex gap-4">
                {socialLinksData.map((link, index) => (
                  <Button
                    key={index}
                    size="icon"
                    variant="outline"
                    className="h-12 w-12"
                    onClick={() => window.open(link.url, "_blank")}
                    aria-label={`Visit ${link.label} profile`}
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
