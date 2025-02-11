"use client"

import { useState } from "react"
import { ToggleButton } from "./toggle-button"
import createUserForm from "./createUserForm"
import ViewPaymentHistroy from "./ViewPaymentHistroy"
import { ViewUsers } from "./ViewUsers"
const pages = [
  { id: 1, component: createUserForm, label: "create User" },
  { id: 2, component: ViewUsers, label: "View Users" },
  { id: 3, component:  ViewPaymentHistroy, label: "View Payment History" },

]

 function Toggle() {
  const [activePage, setActivePage] = useState(1)

  const ActivePageComponent = pages.find((page) => page.id === activePage)?.component || createUserForm

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="flex space-x-2 mb-4">
        {pages.map((page) => (
          <ToggleButton key={page.id} isActive={activePage === page.id} onClick={() => setActivePage(page.id)}>
            {page.label}
          </ToggleButton>
        ))}
      </div>
      <div className="border rounded-lg p-4">
        <ActivePageComponent />
      </div>
    </div>
  )
}

export default Toggle;