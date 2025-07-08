
# ⚡ AI ContentForge

**AI ContentForge** is a full-stack AI-powered content generation platform built with React, Supabase, and a suite of modern tools. It allows users to create content like blog posts, video scripts, rap lyrics, ad copy, and more — all from a single dashboard.

---

## ✨ Features

- 🔐 **Authentication** (Signup/Login with Supabase Auth)
- 🧠 **AI Tools** for:
  - Blog content
  - Video scripts
  - Rap lyrics
  - Ad copy
  - Social media posts
  - Storytelling
- 🖼️ **Beautiful UI** with gradients, icons, and animations
- 📊 **User Dashboard** showing recent generations
- 📚 **History Tracking** for all generated content
- 🎟️ **Free & Pro Plans** with upgrade option
- 📧 **Email Notifications** (n8n-ready)

---

## 🛠️ Tech Stack

| Frontend      | Backend & Infra      | Other Tools       |
| ------------- | -------------------- | ----------------- |
| React + Vite  | Supabase (DB + Auth) | Tailwind CSS      |
| TypeScript    | Supabase Edge Funcs  | Lucide Icons      |
| React Router  | PostgreSQL (RLS)     | Toast Notifications |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/ai-contentforge.git
cd ai-contentforge
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

* Create a Supabase project
* Add the following tables:

  * `profiles` – for user data
  * `generations` – for storing prompt + result
* Enable RLS and create policies
* Create the required `supabaseClient.ts` with your keys

### 4. Configure environment variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Start the app

```bash
npm run dev
```

---

## 🧪 Optional: n8n Integration

Use [n8n](https://n8n.io/) to schedule daily emails with the latest Desi Hip Hop (DHH) news to users.

* Setup Google Programmable Search
* Trigger n8n workflow daily at 9AM
* Send HTML-formatted emails using Gmail OAuth2 credentials

---

## 📁 Project Structure

```
src/
│
├── components/
│   ├── ui/           # Reusable UI components
│   ├── Navbar.tsx    # Top navigation bar
│
├── hooks/
│   ├── useAuth.ts    # Auth context
│   ├── use-toast.ts  # Toast notifications
│
├── integrations/
│   ├── supabase/     # Supabase client config
│
├── pages/
│   ├── Dashboard.tsx # User dashboard
│   ├── HeroSection.tsx # Landing page
│
├── App.tsx
├── main.tsx
```

---

## 🧑‍💻 Author

**Rishabh Jha**
AI enthusiast, full-stack developer, and builder of smart tools.

---

## 📜 License

MIT License – use freely, improve openly.

---

## 💡 Future Improvements

* Stripe integration for Pro subscriptions
* GPT-4 support for better content
* Collaboration tools
* Analytics dashboard
* Number Of Words Improvement

