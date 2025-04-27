# Savin – Modern Ajo For Everyone

Savin is a modern, digital implementation of the traditional rotating savings group (Ajo/Esusu/Susu). It enables users to create or join savings groups, contribute regularly, and receive payouts in Naira, Solana, or USDT. Authentication and embedded wallet creation are powered by Civic.

---

## 🚀 Features

- **Civic Authentication**: Secure sign-in with automatic wallet creation for every user.
- **Create & Join Groups**: Start your own Ajo group or join existing ones using a unique group code.
- **Dashboard**: View all your groups, contributions, and payouts in one place.
- **Group Details**: See group members, contribution schedule, and payout order.
- **Responsive UI**: Built with React and Tailwind CSS for a seamless experience on any device.
- **Supabase Backend**: Real-time database and group management.

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **Authentication & Wallets**: Civic
- **State Management**: Zustand
- **Icons**: Lucide

---

## 📦 Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/YOUR-USERNAME/savin.git
cd savin/ajo
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up environment variables

Create a `.env` file in the `ajo` directory with the following:

```env
VITE_CIVIC_CLIENT_ID=your-civic-client-id
VITE_PUBLIC_URL=http://localhost:5173
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Start the development server

```sh
npm run dev
```


---

## 📝 Usage

- **Create a Group**: Sign in with Civic, then click "Create an Ajo" and fill out the group details.
- **Join a Group**: Click "Join an Ajo" and enter the group code shared by a group creator.
- **Dashboard**: View all your groups and click any group to see its details.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- [Civic](https://www.civic.com/) for authentication and embedded wallets
- [Supabase](https://supabase.com/) for the backend
- [Tailwind CSS](https://tailwindcss.com/) for UI styling
- [shadcn/ui](https://ui.shadcn.com/) and [Lucide](https://lucide.dev/) for UI components and icons

---

**Built with ❤️ by Daniel Anthony.**
