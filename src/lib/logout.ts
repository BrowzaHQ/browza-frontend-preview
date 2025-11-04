export async function logout() {
  try {
    await fetch("/api/logout", { method: "POST" });
  } finally {
    if (typeof window !== "undefined") window.location.href = "/login";
  }
}
