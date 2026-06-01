---
layout: layouts/project.html
title: "Building a WhatsApp Order Automation System with n8n and Node.js"
date: 2026-06-01
description: "A full walkthrough of building a WhatsApp Business chatbot for order management using n8n visual workflows, Node.js, Express, and SQLite — no manual order-taking required."
tags: ["WhatsApp", "n8n", "Node.js", "Automation", "Chatbot", "Order Management", "SQLite", "Webhook"]
github: "https://github.com/amritanka/n8n-whatsapp-order-automation"
featured: true
status: "active"
---

## Overview

Running a small food or retail business and tired of manually responding to WhatsApp messages, taking orders, and sending confirmations? This project solves exactly that.

**WhatsApp N8N Order Automation** is a fully working, self-hosted system that connects your WhatsApp Business account to an intelligent order-processing bot — powered by [n8n](https://n8n.io) visual workflows and a Node.js/Express backend. Customers can browse your menu, place orders, get confirmations, and track their delivery status — all through a simple WhatsApp chat, with zero manual intervention.

---

## Why I Built This

Most small businesses still handle WhatsApp orders manually: read the message, check stock, reply, update a spreadsheet, and repeat. It's repetitive, error-prone, and doesn't scale. I wanted to prove that with the right open-source tools, you can build a production-ready automation in a weekend — without expensive SaaS platforms or vendor lock-in.

The stack I chose:
- **n8n** — open-source, self-hosted workflow automation with a beautiful visual editor
- **Node.js + Express** — lightweight backend to handle webhooks and REST APIs
- **WhatsApp Business API** — official Meta API for programmatic messaging
- **SQLite** — simple, file-based database perfect for this scale

---

## Features at a Glance

| Feature | Details |
|---|---|
| 📱 WhatsApp Integration | Full WhatsApp Business Cloud API support |
| 🤖 Smart Chatbot | Understands MENU, HELP, TRACK, CONFIRM, CANCEL commands |
| 🛒 Order Management | Full order lifecycle: pending → confirmed → preparing → delivered |
| 👥 Customer Management | Auto-creates customer profiles from phone numbers |
| 🗄️ Database Storage | SQLite with customers, orders, and products tables |
| 🔄 n8n Workflow | Visual, importable workflow for order routing and responses |
| 🌐 REST API | Endpoints for orders, customers, and webhooks |
| 📊 Web Dashboard | Simple frontend served at the root URL |

---

## System Architecture

Here is how the pieces fit together:

```
Customer WhatsApp
       │
       ▼
WhatsApp Business API (Meta Cloud)
       │  POST /webhook/whatsapp
       ▼
┌─────────────────────────────────┐
│        Node.js / Express        │
│  server.js  ──►  routes/        │
│                  webhook.js     │
│                  orders.js      │
│                  customers.js   │
│                      │          │
│              services/          │
│              orderProcessor.js  │
│              whatsappService.js │
│                      │          │
│              database/init.js   │
│              (SQLite)           │
└─────────────────────────────────┘
       │
       ▼
  n8n Workflow Engine
  (whatsapp-order-automation.json)
       │
       ▼
WhatsApp Business API (send reply)
```

The Node.js server acts as the central hub. It receives incoming WhatsApp messages via webhook, processes them through the `OrderProcessor` service, reads/writes data in SQLite, and sends replies back through the `WhatsAppService`. n8n sits alongside as the visual workflow layer — perfect for non-developers to tweak routing logic without touching code.

---

## Project Structure

```
n8n-whatsapp-automation/
├── server.js                  # Express app entry point
├── index.js                   # Simple Node.js runner
├── package.json
├── database/
│   └── init.js                # SQLite schema initialization
├── routes/
│   ├── webhook.js             # WhatsApp webhook handler
│   ├── orders.js              # Orders REST API
│   └── customers.js           # Customers REST API
├── services/
│   ├── whatsappService.js     # WhatsApp API wrapper (send messages)
│   └── orderProcessor.js      # Core chatbot logic
├── n8n-workflows/
│   └── whatsapp-order-automation.json  # Importable n8n workflow
└── public/
    └── index.html             # Web dashboard
```

---

## How the Chatbot Works

### Customer Commands

Customers interact purely through natural WhatsApp messages:

| Command | Action |
|---|---|
| `MENU` or `START` | Displays the full product menu with prices |
| `HELP` | Shows ordering instructions and contact info |
| `1x2, 3x1` | Places an order (item ID × quantity) |
| `CONFIRM` or `YES` | Confirms a pending order |
| `CANCEL` or `NO` | Cancels a pending order |
| `TRACK` | Shows the latest order status |

### The Order Flow

```
1. Customer sends "MENU"
        │
        ▼
2. Bot fetches products from SQLite and displays menu

3. Customer replies "1x2, 3x1"
        │
        ▼
4. OrderProcessor parses items → calculates total → saves draft

5. Bot asks: "Confirm your order? Total: $75.50 — Reply CONFIRM or CANCEL"

6. Customer replies "CONFIRM"
        │
        ▼
7. Order saved with status: PENDING → CONFIRMED
   Bot sends order confirmation with order number

8. Business updates status → Customer receives update via TRACK
```

---

## Key Code: The Order Processor

The heart of the system is `services/orderProcessor.js`. It maintains a session `Map` per customer phone number and routes every incoming message to the right handler:

```js
async processIncomingMessage(phoneNumber, messageText, messageType) {
  const normalizedMessage = messageText.toLowerCase().trim();

  if (normalizedMessage === 'menu' || normalizedMessage === 'start') {
    await this.handleMenuRequest(phoneNumber);
  } else if (normalizedMessage === 'help') {
    await this.handleHelpRequest(phoneNumber);
  } else if (normalizedMessage.startsWith('track')) {
    await this.handleTrackingRequest(phoneNumber);
  } else if (this.isOrderMessage(normalizedMessage)) {
    await this.handleOrderMessage(phoneNumber, normalizedMessage);
  } else if (normalizedMessage === 'confirm' || normalizedMessage === 'yes') {
    await this.handleOrderConfirmation(phoneNumber);
  } else if (normalizedMessage === 'cancel' || normalizedMessage === 'no') {
    await this.handleOrderCancellation(phoneNumber);
  } else {
    await this.handleUnknownMessage(phoneNumber);
  }
}
```

### Sending a WhatsApp Message

`services/whatsappService.js` wraps the Meta Cloud API with a clean class:

```js
async sendMessage(to, message) {
  const url = `${this.apiUrl}/${this.phoneNumberId}/messages`;

  await axios.post(url, {
    messaging_product: 'whatsapp',
    to: to,
    type: 'text',
    text: { body: message }
  }, {
    headers: { 'Authorization': `Bearer ${this.accessToken}` }
  });
}
```

It also has dedicated methods for `sendOrderConfirmation()`, `sendMenu()`, and `sendTemplate()` — keeping messaging logic neatly separated from business logic.

---

## Database Schema

Three tables power the backend, initialized automatically on first run via `database/init.js`:

### `customers`
| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER | Primary key |
| `phone_number` | TEXT | WhatsApp number (unique) |
| `name` | TEXT | Customer name |
| `email` | TEXT | Optional |
| `address` | TEXT | Delivery address |

### `orders`
| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER | Primary key |
| `order_number` | TEXT | Unique, human-readable ID |
| `customer_id` | INTEGER | FK → customers |
| `status` | TEXT | pending / confirmed / preparing / ready / delivered / cancelled |
| `items` | TEXT | JSON array of ordered items |
| `total_amount` | REAL | Order total |
| `created_at` | DATETIME | Auto-set on insert |

### `products`
| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER | Primary key |
| `name` | TEXT | Product name |
| `description` | TEXT | Description |
| `price` | REAL | Price |
| `stock_quantity` | INTEGER | Available stock |
| `sku` | TEXT | SKU code |

---

## REST API Endpoints

The Express server exposes a clean REST API for dashboard or third-party integrations:

### Orders
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/orders` | List all orders |
| `GET` | `/api/orders/:id` | Get a specific order |
| `POST` | `/api/orders` | Create a new order |
| `PATCH` | `/api/orders/:id/status` | Update order status |

### Customers
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/customers` | List all customers |
| `GET` | `/api/customers/phone/:phone` | Get customer by phone number |
| `POST` | `/api/customers` | Create or update a customer |

### Webhooks
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/webhook/whatsapp` | WhatsApp webhook verification |
| `POST` | `/webhook/whatsapp` | Receive and process incoming messages |

### Health Check
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Returns server status and timestamp |

---

## The n8n Workflow

The included `n8n-workflows/whatsapp-order-automation.json` is a ready-to-import n8n workflow with the following nodes:

1. **Webhook Trigger** — Receives forwarded messages from the Express server
2. **Message Router** — Switch node that routes based on message content
3. **Menu Handler** — Fetches products and formats the menu message
4. **Order Parser** — Extracts item IDs and quantities from message text
5. **Order Creator** — Calls the REST API to create the order record
6. **Status Tracker** — Queries order status for TRACK requests
7. **Response Sender** — HTTP Request node that calls the WhatsApp API

The visual editor makes it trivially easy to extend the workflow — add an email notification node, connect to a Google Sheet, or post to Slack — without touching any code.

---

## Getting Started

### Prerequisites

- Node.js 16+
- A [Meta Developer Account](https://developers.facebook.com/) with a WhatsApp Business app
- n8n installed globally (`npm install n8n -g`)

### 1. Clone and Install

```bash
git clone https://github.com/amritanka/n8n-whatsapp-order-automation
cd n8n-whatsapp-order-automation
npm install
```

### 2. Configure Environment Variables

Create a `.env` file at the root:

```env
# Server
PORT=3000

# WhatsApp Business API (from Meta Developer Console)
WHATSAPP_API_URL=https://graph.facebook.com/v17.0
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_secure_verify_token

# n8n
N8N_PROTOCOL=http
N8N_HOST=localhost
N8N_PORT=5678

# Business Info
BUSINESS_NAME=My Restaurant
BUSINESS_PHONE=+1234567890
BUSINESS_EMAIL=hello@myrestaurant.com
```

### 3. Start the Servers

```bash
# Terminal 1 — Start the Node.js backend
npm start

# Terminal 2 — Start n8n
n8n start
```

### 4. Set Up the WhatsApp Webhook

1. Go to **Meta Developer Console → Your App → WhatsApp → Configuration**
2. Set the **Webhook URL** to: `https://your-domain.com/webhook/whatsapp`
3. Set the **Verify Token** to match your `.env` value
4. Subscribe to **messages** events

> 💡 For local development, use [ngrok](https://ngrok.com/) to expose your localhost: `ngrok http 3000`

### 5. Import the n8n Workflow

1. Open n8n at `http://localhost:5678`
2. Click **Import from file**
3. Select `n8n-workflows/whatsapp-order-automation.json`
4. Configure the webhook nodes with your server's URL
5. Activate the workflow

---

## Tech Stack Summary

| Technology | Role |
|---|---|
| **Node.js** | Runtime |
| **Express.js** | Web framework & REST API |
| **SQLite3** | Local database |
| **Axios** | HTTP client for WhatsApp API calls |
| **dotenv** | Environment variable management |
| **CORS** | Cross-origin request support |
| **UUID** | Unique order number generation |
| **Moment.js** | Date/time formatting |
| **n8n** | Visual workflow automation engine |
| **WhatsApp Business Cloud API** | Messaging platform |
| **Nodemon** | Dev server with auto-reload |

---

## What I Learned

- **WhatsApp webhook verification** is a two-step process: Meta first sends a `GET` with a challenge token you must echo back, then starts sending `POST` events.
- **Session state on a stateless server** — using an in-memory `Map` keyed by phone number is simple and effective for low-traffic bots. For production, replace with Redis.
- **n8n is genuinely powerful** — the visual workflow made it easy to prototype the routing logic before wiring it up to code. It's a great tool for bridging the gap between developers and non-technical stakeholders.
- **SQLite is underrated** — for a single-server deployment with moderate traffic, SQLite is fast, zero-config, and requires no separate database process.

---

## What's Next

- [ ] Add Redis for persistent session storage
- [ ] Support image/media messages for product photos
- [ ] Build an admin dashboard for real-time order management
- [ ] Add payment integration (Stripe or PayPal)
- [ ] Deploy to Railway or Render with a persistent volume for SQLite
- [ ] Add multi-language support via i18n

---

## Source Code

The full source code is available on GitHub: [github.com/amritanka/n8n-whatsapp-order-automation](https://github.com/amritanka/n8n-whatsapp-order-automation)

Feel free to fork it, open issues, or submit pull requests. If you build something cool with it, I'd love to hear about it!
