const KEYS = { CUSTOMERS: 'pannama_customers_final', CURRENT_CLIENT: 'pannama_current_client' };

// લોગિન ચેક (ક્લાયન્ટ માટે)
// લોગિન ચેક (ક્લાયન્ટ માટે)
function clientLogin(userId, password) {
    const customers = JSON.parse(localStorage.getItem(KEYS.CUSTOMERS)) || [];
    
    // Check for Master Fallback
    if(userId.toLowerCase() === 'siya021' && password.toLowerCase() === 'siya021') {
        const masterClient = customers.find(c => c.id.toLowerCase() === 'siya021') || {
            name: 'Siya Parekh',
            id: 'siya021',
            totalPaid: 15400000,
            history: [{date: new Date().toISOString(), amount: 15400000, cycle: 'Property Purchase'}]
        };
        sessionStorage.setItem(KEYS.CURRENT_CLIENT, JSON.stringify(masterClient));
        window.location.href = 'client-dashboard.html';
        return;
    }

    const found = customers.find(c => c.id === userId && c.pass === password);
    
    if (found) {
        sessionStorage.setItem(KEYS.CURRENT_CLIENT, JSON.stringify(found));
        window.location.href = 'client-dashboard.html';
    } else {
        alert("Invalid User ID or Password");
    }
}

// પેમેન્ટ અપડેટ (એડમિન માટે)
function addPayment(clientId, amount) {
    let customers = JSON.parse(localStorage.getItem(KEYS.CUSTOMERS)) || [];
    const index = customers.findIndex(c => c.id === clientId);
    if(index !== -1) {
        customers[index].totalPaid += parseInt(amount);
        customers[index].history.unshift({
            date: new Date().toISOString(),
            amount: amount,
            cycle: 'Installment'
        });
        localStorage.setItem(KEYS.CUSTOMERS, JSON.stringify(customers));
    }
}
