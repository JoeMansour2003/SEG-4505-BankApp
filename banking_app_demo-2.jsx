import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, ArrowLeft, Settings, CreditCard, Send, Home } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [balance, setBalance] = useState(2500.75);
  const [transactions, setTransactions] = useState([
    { id: 1, desc: 'Grocery Store', amount: -82.5 },
    { id: 2, desc: 'Salary Deposit', amount: 1200 },
    { id: 3, desc: 'Electric Bill', amount: -120 },
    { id: 4, desc: 'Gas Station', amount: -50.35 },
  ]);
  const [transferAmount, setTransferAmount] = useState('');
  const [transferRecipient, setTransferRecipient] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') setScreen('overview');
  };

  const handleTransfer = () => {
    if (transferAmount && transferRecipient) {
      const amt = parseFloat(transferAmount);
      setBalance((prev) => prev - amt);
      setTransactions((prev) => [
        { id: Date.now(), desc: `Transfer to ${transferRecipient}`, amount: -amt },
        ...prev,
      ]);
      setTransferAmount('');
      setTransferRecipient('');
      alert('Transfer successful!');
    }
  };

  const handleChequeUpload = (e) => {
    if (e.target.files.length) {
      const amount = Math.floor(Math.random() * 1000) + 50;
      setBalance((prev) => prev + amount);
      setTransactions((prev) => [
        { id: Date.now(), desc: 'Cheque Deposit', amount },
        ...prev,
      ]);
      alert(`Cheque of $${amount} deposited!`);
    }
  };

  const navBar = (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 shadow-md">
      <Button variant="ghost" onClick={() => setScreen('overview')}><Home className="w-5 h-5" /></Button>
      <Button variant="ghost" onClick={() => setScreen('transfer')}><Send className="w-5 h-5" /></Button>
      <Button variant="ghost" onClick={() => setScreen('deposit')}><CreditCard className="w-5 h-5" /></Button>
      <Button variant="ghost" onClick={() => setScreen('settings')}><Settings className="w-5 h-5" /></Button>
    </div>
  );

  const screens = {
    login: (
      <motion.div
        key="login"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        className="flex flex-col items-center justify-center h-full text-center"
      >
        <h1 className="text-3xl font-bold text-green-700 mb-4">Banque canadienne de l’agriculture</h1>
        <Card className="w-80 shadow-2xl">
          <CardContent className="flex flex-col gap-4 p-6">
            <h2 className="text-xl font-semibold text-green-800">Login</h2>
            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button className="w-full bg-green-700 hover:bg-green-800 text-white" onClick={handleLogin}>Login</Button>
          </CardContent>
        </Card>
      </motion.div>
    ),

    overview: (
      <motion.div key="overview" initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="h-full overflow-y-auto p-4">
        <h2 className="text-2xl font-bold text-green-700 mb-3">Account Overview</h2>
        <Card className="shadow-lg p-4 mb-4">
          <p className="text-gray-600">Current Balance</p>
          <h3 className="text-3xl font-bold text-green-700">${balance.toFixed(2)}</h3>
        </Card>
        <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
        <ul className="space-y-2">
          {transactions.map((t) => (
            <li key={t.id} className="flex justify-between border-b pb-1 text-sm">
              <span>{t.desc}</span>
              <span className={t.amount < 0 ? 'text-red-500' : 'text-green-600'}>
                {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        {navBar}
      </motion.div>
    ),

    transfer: (
      <motion.div key="transfer" initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="h-full overflow-y-auto p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" onClick={() => setScreen('overview')}><ArrowLeft /></Button>
          <h2 className="text-2xl font-bold text-green-700 ml-2">Transfer Money</h2>
        </div>
        <Input placeholder="Recipient Name" value={transferRecipient} onChange={(e) => setTransferRecipient(e.target.value)} />
        <Input type="number" placeholder="Amount" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} className="mt-2" />
        <Button className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white" onClick={handleTransfer}>Send Money</Button>
      </motion.div>
    ),

    deposit: (
      <motion.div key="deposit" initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="h-full overflow-y-auto p-4 text-center">
        <div className="flex items-center mb-4">
          <Button variant="ghost" onClick={() => setScreen('overview')}><ArrowLeft /></Button>
          <h2 className="text-2xl font-bold text-green-700 ml-2">Deposit a Cheque</h2>
        </div>
        <label className="cursor-pointer flex flex-col items-center border-2 border-dashed border-green-500 rounded-xl p-6 hover:bg-green-50">
          <Upload className="w-10 h-10 mb-2 text-green-700" />
          <span>Tap to upload cheque photo</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleChequeUpload} />
        </label>
      </motion.div>
    ),

    settings: (
      <motion.div key="settings" initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="h-full overflow-y-auto p-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" onClick={() => setScreen('overview')}><ArrowLeft /></Button>
          <h2 className="text-2xl font-bold text-green-700 ml-2">Settings</h2>
        </div>
        <Button variant="outline" className="w-full mb-2">Change Password</Button>
        <Button variant="outline" className="w-full mb-2">Language: Français / English</Button>
        <Button variant="outline" className="w-full mb-2">Dark Mode</Button>
        <Button className="w-full bg-red-500 hover:bg-red-600 text-white" onClick={() => setScreen('login')}>Logout</Button>
      </motion.div>
    ),
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="bg-white w-[375px] h-[812px] rounded-[40px] shadow-2xl overflow-hidden relative border-[10px] border-black">
        <AnimatePresence mode="wait">{screens[screen]}</AnimatePresence>
      </div>
    </div>
  );
}
