const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api`;

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  async verifyToken() {
    const token = sessionStorage.getItem("admin_token");
    if (!token) return { success: false };
    try {
      const res = await fetch(`${API_BASE}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return { success: false };
      return await res.json();
    } catch {
      return { success: false };
    }
  },

  // Product Requests
  async getRequests() {
    const res = await fetch(`${API_BASE}/get`);
    return res.json();
  },

  // Quotations
  async sendQuotation(data) {
    const res = await fetch(`${API_BASE}/quotations/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async listQuotations() {
    const res = await fetch(`${API_BASE}/quotations/list`);
    return res.json();
  },

  async approveQuotation(token) {
    const res = await fetch(`${API_BASE}/quotations/approve/${token}`);
    return res.json();
  },
};
