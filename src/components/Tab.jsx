import React, { useState } from "react";

export default function Tab() {

    const Tab = ({ label, onClick, isActive }) => (
        <div
            className={`tab ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            {label}
        </div>
    );

}
