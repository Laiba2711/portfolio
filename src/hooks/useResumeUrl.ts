import { useEffect, useState } from "react";

/**
 * Fetches the resume URL from the database via the stats API.
 * Returns null while loading or if no resume is uploaded.
 */
export function useResumeUrl(): string | null {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data?.resumeUrl) setResumeUrl(data.resumeUrl);
      })
      .catch(() => {
        // Fallback to static file if API fails
        setResumeUrl("/resume.pdf");
      });
  }, []);

  return resumeUrl;
}
