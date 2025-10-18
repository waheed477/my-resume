import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 bg-card border-t">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2" data-testid="text-footer">
            Built with <Heart className="h-4 w-4 text-primary fill-primary" /> by Waheed Aslam
          </p>
          <p className="text-sm text-muted-foreground mt-2" data-testid="text-copyright">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
