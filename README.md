# Bento Marketplace Server
Welcome to Bento Marketplace Server! This README.md file serves as a guide to understanding the main features of the app, its folder structure, and how to run it on your local machine.

## Features

**Delivery:**
  - Allow users to select delivery as an option for receiving their orders.
  - Integrate with delivery services and provide estimated delivery times.
**Pickup:**
  - Enable users to choose pickup as an option to collect their orders.
**Reservation:**
  - Allow users to make table reservations at the restaurant through the platform.
  - Provide options for selecting the date, time, and number of guests.
  - Send confirmation details to the user via email or SMS.
**Recommended Restaurants:**
  - Utilize algorithms to recommend restaurants based on user preferences, tasty tags and past orders.
  - Highlight trending and low utilization restaurants to users.
**Popular Restaurants:**
  - Showcase popular restaurants based on factors such as ratings, and order frequency.
**Filter Restaurants by Cuisine, Price, Like:**
  - Implement filters to help users narrow down restaurant choices based on cuisine types, price ranges, and user preferences.
  - Allow users to favorite restaurants for future reference.
**Different Categories Menu Items:**
  - Categorize menu items into sections such as appetizers, main courses, desserts, etc.
  - Provide intuitive navigation for users to explore menu categories easily.
**Discount/offer:**
  - Display ongoing discounts or special offers from restaurants.
**Add to Cart, Edit Cart:**
  - Enable users to add items to their cart while browsing the menu.
  - Provide options to edit the cart, including adding, removing, or modifying quantities of items.
**Place order:**
  - Allow users to review their order details and proceed to checkout.
**Schedule Order Place:**
  - Allow users to schedule the delivery or pickup time for their orders.
**Real-Time Tracking of Orders:**
  - Provide real-time tracking of orders from preparation to delivery.
  - Keep users informed about the current status of their order.
**Order History:**
  - Maintain a history of past orders for users to reference.
  - Allow users to view order details, including items ordered, total cost, and order status.


## Folder Structure

```
├──server
│     ├── node_modules
│     ├── src
│     │   ├── controllers
│     │   ├── dummy-data
│     │   ├── interfaces
│     │   ├── middlewares
│     │   ├── models
│     │   ├── routers
│     │   ├── utilities
|     |   ├── services
│     │   ├── config.ts
│     │   └── app.ts   
│     ├── .env
│     ├── .env.example
│     ├──  package-lock.json
│     ├──  package.json
│     ├──  tsconfig.json
│     ├── .gitignore
│     └──  README.md
```

## Getting Started

### Prerequisites

- Node.js (version X.X.X or later)
- npm
- concurrently

### Installation
1. Clone the repository or download the source code: ```  git clone https://github.com/h3000plus/Server.git ```  

2. Navigate into the server directory: ``` cd Server ```

3. Install dependencies using npm: ``` npm install ```

4. Start the server: ``` npm run dev ```
