import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Upload,
  ArrowLeft,
  Settings,
  Send,
  Home,
  Wallet,
  HelpCircle,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

const SCREEN_WIDTH = 375;

export default function App() {
  const [screen, setScreen] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState(2500.75);
  const [transactions, setTransactions] = useState([
    { id: 1, desc: "Grocery Store", amount: -82.5 },
    { id: 2, desc: "Salary Deposit", amount: 1200 },
    { id: 3, desc: "Electric Bill", amount: -120 },
    { id: 4, desc: "Gas Station", amount: -50.35 },
  ]);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferRecipient, setTransferRecipient] = useState("");
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [resetEmail, setResetEmail] = useState("");
  const chequeInputRef = useRef(null);

  const accounts = [
    {
      id: "chequing",
      name: "Everyday Chequing",
      number: "•••• 2841",
      balance,
    },
    {
      id: "savings",
      name: "High-Interest Savings",
      number: "•••• 8890",
      balance: 8200.4,
    },
    {
      id: "visa",
      name: "Visa Infinite",
      number: "•••• 4421",
      balance: -325.6,
    },
  ];

  const moreActions = [
    {
      id: "between",
      label: "Transfer Between Accounts",
      onClick: () => setScreen("transfer"),
    },
    { id: "bill", label: "Pay a Bill" },
    { id: "etransfer", label: "Interac e-Transfer" },
    {
      id: "deposit",
      label: "Deposit a Cheque",
      onClick: () => chequeInputRef.current?.click(),
    },
    { id: "credit", label: "Check Credit Score" },
    { id: "international", label: "International Transfer" },
    { id: "history", label: "Transfer History" },
    { id: "cancel", label: "Cancel a Transfer" },
  ];

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      setScreen("overview");
    } else {
      alert("Invalid credentials. Try admin / 1234");
    }
  };

  const handleTransfer = () => {
    if (transferAmount && transferRecipient) {
      const amt = parseFloat(transferAmount);
      if (isNaN(amt) || amt <= 0) return alert("Enter a valid amount");
      if (amt > balance) return alert("Insufficient funds");
      setBalance((prev) => prev - amt);
      setTransactions((prev) => [
        {
          id: Date.now(),
          desc: `Transfer to ${transferRecipient}`,
          amount: -amt,
        },
        ...prev,
      ]);
      setTransferAmount("");
      setTransferRecipient("");
      alert("Transfer successful!");
    }
  };

  const handleChequeUpload = (e) => {
    if (e.target.files?.length) {
      const amount = Math.floor(Math.random() * 1000) + 50;
      setBalance((prev) => prev + amount);
      setTransactions((prev) => [
        { id: Date.now(), desc: "Cheque Deposit", amount },
        ...prev,
      ]);
      alert(`Cheque of $${amount} deposited!`);
      e.target.value = "";
    }
  };

  const handleSignup = () => {
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      return alert("Fill in all fields to sign up");
    }
    alert(`Welcome aboard, ${signupForm.name}! You can now log in.`);
    setSignupForm({ name: "", email: "", password: "" });
    setScreen("login");
  };

  const handleReset = () => {
    if (!resetEmail) return alert("Enter the email tied to your account");
    alert(`Reset instructions sent to ${resetEmail}`);
    setResetEmail("");
    setScreen("login");
  };

  const triggerPlaceholder = (label) => {
    alert(`${label} is coming soon in this demo.`);
  };

  const navButtonClass = (target) =>
    `flex flex-col items-center gap-1 text-xs font-medium px-3 ${
      screen === target ? "text-green-700" : "text-gray-400"
    }`;

  const navBar = (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-green-100 flex justify-around py-3 shadow-lg">
      <Button
        variant="ghost"
        className={navButtonClass("overview")}
        onClick={() => setScreen("overview")}
      >
        <Home className="w-5 h-5" />
        <span className="text-xs">Home</span>
      </Button>
      <Button
        variant="ghost"
        className={navButtonClass("transfer")}
        onClick={() => setScreen("transfer")}
      >
        <Send className="w-5 h-5" />
        <span className="text-xs">Send</span>
      </Button>
      <Button
        variant="ghost"
        className={navButtonClass("more")}
        onClick={() => setScreen("more")}
      >
        <Wallet className="w-5 h-5" />
        <span className="text-xs">More $</span>
      </Button>
      <Button
        variant="ghost"
        className={navButtonClass("settings")}
        onClick={() => setScreen("settings")}
      >
        <Settings className="w-5 h-5" />
        <span className="text-xs">Settings</span>
      </Button>
    </div>
  );

  const pageTransition = {
    initial: { x: SCREEN_WIDTH, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -SCREEN_WIDTH, opacity: 0 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  };

  const fadeTransition = {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  };

  const screens = {
    login: (
      <motion.div
        key="login"
        {...fadeTransition}
        className="absolute inset-0 overflow-y-auto px-6 pt-14 pb-28"
      >
        <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-green-700">
              Banque canadienne de l'agriculture
            </h1>
            <p className="text-sm text-gray-600">
              Sign in below to access all of your banking tools.
            </p>
          </div>
          <Card className="rounded-3xl shadow-xl border border-green-100">
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="space-y-1 text-left">
                <h2 className="text-xl font-semibold text-green-800">Log in</h2>
                <p className="text-xs text-gray-500">
                  Use your online banking credentials.
                </p>
              </div>
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && handleLogin()}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && handleLogin()}
              />
              <Button className="w-full h-12 text-base" onClick={handleLogin}>
                Sign in
              </Button>
              <div className="flex items-center justify-between text-xs text-green-700">
                <button
                  type="button"
                  className="hover:underline"
                  onClick={() => setScreen("signup")}
                >
                  Create account
                </button>
                <button
                  type="button"
                  className="hover:underline"
                  onClick={() => setScreen("forgot")}
                >
                  Forgot password?
                </button>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Demo creds: admin / 1234
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    ),

    signup: (
      <motion.div
        key="signup"
        {...fadeTransition}
        className="absolute inset-0 overflow-y-auto px-6 pt-8 pb-20 bg-gradient-to-b from-green-50 to-white"
      >
        <Button
          variant="ghost"
          onClick={() => setScreen("login")}
          className="mb-8 p-2 hover:bg-green-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-green-700" />
        </Button>

        <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
          <div className="space-y-3 text-center">
            <div className="w-20 h-20 mx-auto bg-green-700 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-800">Join us today</h1>
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              Create your account and unlock a world of modern banking designed
              for you.
            </p>
          </div>

          <Card className="rounded-3xl shadow-xl border border-green-100 bg-white">
            <CardContent className="flex flex-col gap-5 p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Full Name
                  </label>
                  <Input
                    placeholder="John Doe"
                    value={signupForm.name}
                    onChange={(e) =>
                      setSignupForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={signupForm.email}
                    onChange={(e) =>
                      setSignupForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Password
                  </label>
                  <Input
                    type="password"
                    placeholder="At least 8 characters"
                    value={signupForm.password}
                    onChange={(e) =>
                      setSignupForm((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="h-12 text-base"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Must contain at least 8 characters
                  </p>
                </div>
              </div>

              <Button
                className="w-full h-12 text-base bg-green-700 hover:bg-green-800 mt-2"
                onClick={handleSignup}
              >
                Create Account
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-white text-gray-500">
                    By signing up, you agree to our Terms
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                className="text-green-700 font-semibold hover:underline"
                onClick={() => setScreen("login")}
              >
                Sign in instead
              </button>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <p className="text-xs text-gray-600 font-medium">Secure</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <p className="text-xs text-gray-600 font-medium">Fast</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-xs text-gray-600 font-medium">Trusted</p>
            </div>
          </div>
        </div>
      </motion.div>
    ),

    forgot: (
      <motion.div
        key="forgot"
        {...fadeTransition}
        className="absolute inset-0 overflow-y-auto px-6 pt-8 pb-20 bg-gradient-to-b from-green-50 to-white"
      >
        <Button
          variant="ghost"
          onClick={() => setScreen("login")}
          className="mb-8 p-2 hover:bg-green-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-green-700" />
        </Button>

        <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
          <div className="space-y-3 text-center">
            <div className="w-20 h-20 mx-auto bg-green-700 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-800">
              Reset Password
            </h1>
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              No worries! Enter your email address and we'll send you
              instructions to reset your password.
            </p>
          </div>

          <Card className="rounded-3xl shadow-xl border border-green-100 bg-white">
            <CardContent className="flex flex-col gap-5 p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    onKeyUp={(e) => e.key === "Enter" && handleReset()}
                    className="h-12 text-base"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll send a secure reset link to this email
                  </p>
                </div>
              </div>

              <Button
                className="w-full h-12 text-base bg-green-700 hover:bg-green-800 mt-2"
                onClick={handleReset}
              >
                Send Reset Link
              </Button>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <button
                type="button"
                className="text-green-700 font-semibold hover:underline"
                onClick={() => setScreen("login")}
              >
                Sign in instead
              </button>
            </p>
          </div>

          <Card className="bg-blue-50/50 border border-blue-100 rounded-2xl">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-blue-900">
                    Can't access your email?
                  </h3>
                  <p className="text-xs text-blue-700">
                    Contact our support team at 1-800-555-0100 or visit any
                    branch with valid ID.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="text-center p-3 bg-white rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Response time</p>
              <p className="text-sm font-semibold text-green-700">
                Under 2 min
              </p>
            </div>
            <div className="text-center p-3 bg-white rounded-xl border border-gray-100">
              <p className="text-xs text-gray-500 mb-1">Link validity</p>
              <p className="text-sm font-semibold text-green-700">24 hours</p>
            </div>
          </div>
        </div>
      </motion.div>
    ),

    overview: (
      <motion.div
        key="overview"
        {...pageTransition}
        className="absolute inset-0 overflow-y-auto p-4 pb-28"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          Account Overview
        </h2>
        <div className="grid gap-3 mb-4">
          {accounts.map((acc) => (
            <Card key={acc.id} className="shadow-sm border border-green-100">
              <CardContent className="flex justify-between items-start p-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    {acc.name}
                  </p>
                  <p className="text-sm text-gray-400">{acc.number}</p>
                </div>
                <p
                  className={`text-xl font-semibold ${
                    acc.balance < 0 ? "text-red-500" : "text-green-700"
                  }`}
                >
                  {acc.balance < 0 ? "-" : ""}$
                  {Math.abs(acc.balance).toFixed(2)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="shadow-sm mb-4">
          <CardContent className="p-4">
            <p className="text-gray-600">Recent Transactions</p>
            <ul className="space-y-2 mt-3 text-sm">
              {transactions.map((t) => (
                <li
                  key={t.id}
                  className="flex justify-between border-b border-dashed pb-2"
                >
                  <span>{t.desc}</span>
                  <span
                    className={t.amount < 0 ? "text-red-500" : "text-green-600"}
                  >
                    {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        {navBar}
      </motion.div>
    ),

    transfer: (
      <motion.div
        key="transfer"
        {...pageTransition}
        className="absolute inset-0 overflow-y-auto p-4 pb-28"
      >
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => setScreen("overview")}
            className="p-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-2xl font-bold text-green-700 ml-2">
            Transfer Money
          </h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Recipient
            </label>
            <Input
              placeholder="Enter recipient name"
              value={transferRecipient}
              onChange={(e) => setTransferRecipient(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Amount</label>
            <Input
              type="number"
              placeholder="0.00"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </div>
          <Button className="mt-6 w-full" onClick={handleTransfer}>
            Send Money
          </Button>
        </div>
        {navBar}
      </motion.div>
    ),

    more: (
      <motion.div
        key="more"
        {...pageTransition}
        className="absolute inset-0 overflow-y-auto p-4 pb-28"
      >
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => setScreen("overview")}
            className="p-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-2xl font-bold text-green-700 ml-2">
            More Money Tools
          </h2>
        </div>
        <Card className="shadow-sm mb-4 border border-green-100">
          <CardContent className="space-y-3 p-4">
            <p className="text-sm text-gray-600">
              Quick actions to help you move, grow, and manage your money.
            </p>
            <div className="space-y-3">
              {moreActions.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  className="w-full justify-between h-12"
                  onClick={() =>
                    action.onClick
                      ? action.onClick()
                      : triggerPlaceholder(action.label)
                  }
                >
                  <span>{action.label}</span>
                  <ArrowRight className="w-4 h-4 text-green-600" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        <input
          ref={chequeInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChequeUpload}
        />
        {navBar}
      </motion.div>
    ),

    settings: (
      <motion.div
        key="settings"
        {...pageTransition}
        className="absolute inset-0 overflow-y-auto p-4 pb-28"
      >
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => setScreen("overview")}
            className="p-2"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-2xl font-bold text-green-700 ml-2">Settings</h2>
        </div>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start text-left h-12"
          >
            Change Password
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-left h-12"
          >
            Language: Français / English
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-left h-12"
          >
            Dark Mode
          </Button>
          <Card className="border border-green-100">
            <CardContent className="space-y-4 p-4">
              <div className="flex items-center gap-2 text-green-700">
                <HelpCircle className="w-5 h-5" />
                <p className="font-semibold">Help &amp; Contact Us</p>
              </div>
              <p className="text-sm text-gray-600">
                Need a hand? Our advisors are available 24/7.
              </p>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span>1-800-555-0100</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-600" />
                  <span>support@bcagri.ca</span>
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => triggerPlaceholder("Schedule a callback")}
              >
                Schedule a callback
              </Button>
            </CardContent>
          </Card>
          <div className="pt-4">
            <Button
              variant="destructive"
              className="w-full h-12"
              onClick={() => setScreen("login")}
            >
              Logout
            </Button>
          </div>
        </div>
        {navBar}
      </motion.div>
    ),
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="bg-white w-[375px] h-[812px] rounded-[40px] shadow-2xl overflow-hidden relative border-[10px] border-black">
        <div className="relative w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">{screens[screen]}</AnimatePresence>
        </div>
      </div>
    </div>
  );
}
