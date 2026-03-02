// ---- Initialize DB in localStorage ---
function initDB() {
  if (!localStorage.getItem('kk_users')) {
    localStorage.setItem('kk_users', JSON.stringify([{ email: 'admin@kk.com', password: 'password123', role: 'admin', name: 'Super Admin' }]));
  }
  if (!localStorage.getItem('kk_vehicles')) {
    localStorage.setItem('kk_vehicles', JSON.stringify([
      { id: 1, type: 'hatchback', city: 'nagpur', name: 'Maruti Swift', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop', seats: 5, fuel: 'Petrol', transmission: 'Manual', price: 1800, available: true, specs: 'AC, Power Steering, Airbags', terms: 'Min 1 day • Unlimited kms • Insurance included' },
      { id: 2, type: 'sedan', city: 'pune', name: 'Honda City', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop', seats: 5, fuel: 'Petrol', transmission: 'Automatic', price: 2500, available: true, specs: 'AC, Power Steering, Airbags, Reverse Camera', terms: 'Min 1 day • Unlimited kms • Insurance included' },
      { id: 3, type: 'suv', city: 'nagpur', name: 'Hyundai Creta', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=800&auto=format&fit=crop', seats: 7, fuel: 'Diesel', transmission: 'Automatic', price: 3200, available: true, specs: 'AC, Power Steering, Airbags, Sunroof', terms: 'Min 1 day • Unlimited kms • Insurance included' },
      { id: 4, type: 'bike', city: 'pune', name: 'Royal Enfield Classic 350', image: 'https://images.unsplash.com/photo-1558980664-3a031cf67ea8?q=80&w=800&auto=format&fit=crop', seats: 2, fuel: 'Petrol', transmission: 'Manual', price: 800, available: true, specs: 'Helmet provided • Disc brakes', terms: 'Min 4 hrs • 150 kms/day • Insurance included' },
      { id: 5, type: 'scooter', city: 'nagpur', name: 'Honda Activa 6G', image: 'https://images.unsplash.com/photo-1591637335036-1b5b6b5b3b3f?q=80&w=800&auto=format&fit=crop', seats: 2, fuel: 'Petrol', transmission: 'Automatic', price: 400, available: true, specs: 'Helmet provided • USB charging', terms: 'Min 4 hrs • 100 kms/day • Insurance included' },
      { id: 6, type: 'truck', city: 'pune', name: 'Tata 407', image: 'https://images.unsplash.com/photo-1563114773-014948e0b2e5?q=80&w=800&auto=format&fit=crop', seats: 3, fuel: 'Diesel', transmission: 'Manual', price: 4500, available: true, specs: '2.5 ton capacity • GPS tracking', terms: 'Min 1 day • 300 kms/day • Driver included' }
    ]));
  }
  if (!localStorage.getItem('kk_bookings')) {
    localStorage.setItem('kk_bookings', JSON.stringify([
      { id: 'B1001', vehicleId: 2, customerName: 'Rahul Sharma', vehicleName: 'Honda City', price: 2500, date: 'Oct 24, 2026', status: 'Active Trip' },
      { id: 'B1002', vehicleId: 0, customerName: 'Priya Singh', vehicleName: 'PUC Renewal', price: 500, date: 'Oct 24, 2026', status: 'Pending' },
      { id: 'B1003', vehicleId: 3, customerName: 'Amit Kumar', vehicleName: 'Hyundai Creta', price: 3200, date: 'Oct 23, 2026', status: 'Active Trip' },
      { id: 'B1004', vehicleId: 0, customerName: 'Sneha Patil', vehicleName: 'Insurance Renew', price: 15000, date: 'Oct 22, 2026', status: 'Pending' }
    ]));
  }
}
initDB();

// ---- Auth & UI Updates ----
function updateNav() {
  const userStr = localStorage.getItem('kk_current_user');
  const user = userStr ? JSON.parse(userStr) : null;

  document.querySelectorAll('.nav-auth-btn').forEach(btn => {
    if (user) {
      if (user.role === 'admin') {
        btn.innerHTML = 'Admin Panel';
        btn.href = 'admin.html';
      } else {
        btn.innerHTML = 'Logout';
        btn.href = '#';
        btn.onclick = (e) => { e.preventDefault(); logout(); };
      }
    } else {
      btn.innerHTML = 'Login';
      btn.href = 'login.html';
      btn.onclick = null;
    }
  });

  document.querySelectorAll('.nav-auth-mobile').forEach(btn => {
    if (user) {
      if (user.role === 'admin') {
        btn.querySelector('span:not(.nav-icon)').innerHTML = 'Admin';
        btn.href = 'admin.html';
      } else {
        btn.querySelector('span:not(.nav-icon)').innerHTML = 'Logout';
        btn.href = '#';
        btn.onclick = (e) => { e.preventDefault(); logout(); };
      }
    } else {
      btn.querySelector('span:not(.nav-icon)').innerHTML = 'Profile';
      btn.href = 'login.html';
      btn.onclick = null;
    }
  });
}

function logout() {
  localStorage.removeItem('kk_current_user');
  alert('Logged out successfully.');
  window.location.reload();
}

// ---- Theme Management ----
function initTheme() {
  const savedTheme = localStorage.getItem('kk_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('kk_theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    if (btn.innerHTML.includes('🌙') || btn.innerHTML.includes('☀️')) {
      btn.innerHTML = theme === 'light' ? '🌙' : '☀️';
    } else if (btn.querySelector('.nav-icon')) {
      // Mobile toggle specific
      btn.querySelector('.nav-icon').innerHTML = theme === 'light' ? '🌙' : '☀️';
    }
  });
}

// ---- Forms & Operations ----
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateNav();

  // Index Page: PUC Status Tracking Form
  const statusForm = document.getElementById('statusForm');
  if (statusForm) {
    const vehicleInput = document.getElementById('vehicleNumber');
    const mobileInput = document.getElementById('mobileNumber');
    const modal = document.getElementById('recordModal');
    const closeBtn = modal ? modal.querySelector('.modal-close') : null;

    statusForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const vehicle = vehicleInput.value.trim().toUpperCase();
      const mobile = mobileInput.value.trim();
      if (!/^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/.test(vehicle)) {
        vehicleInput.style.borderColor = '#ef4444'; return;
      } else { vehicleInput.style.borderColor = 'var(--border)'; }
      if (!/^\d{10}$/.test(mobile)) {
        mobileInput.style.borderColor = '#ef4444'; return;
      } else { mobileInput.style.borderColor = 'var(--border)'; }

      if (modal) modal.classList.add('open');
    });

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
  }

  // Index Page: Centers Filtering
  const regionFilter = document.getElementById('regionFilter');
  if (regionFilter) {
    regionFilter.addEventListener('change', () => {
      const value = regionFilter.value;
      document.querySelectorAll('.center-card').forEach((card) => {
        const region = card.getAttribute('data-region');
        card.style.display = value === 'all' || region === value ? '' : 'none';
      });
    });
  }

  // Auth: Login logic
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pass = document.getElementById('loginPassword').value.trim();
      const users = JSON.parse(localStorage.getItem('kk_users') || '[]');

      const validUser = users.find(u => u.email === email && u.password === pass);
      if (validUser) {
        const safeUser = { ...validUser }; delete safeUser.password;
        localStorage.setItem('kk_current_user', JSON.stringify(safeUser));
        alert('Welcome back, ' + (safeUser.name || email) + '!');
        window.location.href = safeUser.role === 'admin' ? 'admin.html' : 'index.html';
      } else {
        document.getElementById('loginError').style.display = 'block';
      }
    });
  }

  // Auth: Register logic
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('registerName') ? document.getElementById('registerName').value.trim() : 'User';
      const email = document.getElementById('registerEmail').value.trim();
      const pass = document.getElementById('registerPassword').value.trim();
      const confirmPass = document.getElementById('registerConfirmPassword').value.trim();

      if (pass !== confirmPass) {
        alert("Passwords don't match."); return;
      }
      const users = JSON.parse(localStorage.getItem('kk_users') || '[]');
      if (users.find(u => u.email === email)) {
        alert("Email already registered."); return;
      }
      users.push({ email, password: pass, name, role: 'customer' });
      localStorage.setItem('kk_users', JSON.stringify(users));
      alert('Registration successful! Please login.');
      window.location.href = 'login.html';
    });
  }

  // Vehicles Page: Rendering & Filtering
  const vehicleCards = document.getElementById('vehicleCards');
  if (vehicleCards) {
    let vehicles = JSON.parse(localStorage.getItem('kk_vehicles') || '[]');
    let filteredVehicles = [...vehicles];

    window.bookVehicle = function (vehicleId) {
      const userStr = localStorage.getItem('kk_current_user');
      if (!userStr) {
        alert('Please log in first to book a vehicle.');
        window.location.href = 'login.html';
        return;
      }
      const user = JSON.parse(userStr);
      const vehicle = vehicles.find(v => v.id === vehicleId);
      if (!vehicle) return;

      const bookings = JSON.parse(localStorage.getItem('kk_bookings') || '[]');
      bookings.push({
        id: 'B' + Math.floor(1000 + Math.random() * 9000),
        vehicleId: vehicleId,
        customerName: user.name || user.email,
        customerEmail: user.email,
        vehicleName: vehicle.name,
        price: vehicle.price,
        date: new Date().toLocaleDateString(),
        status: 'Pending'
      });
      localStorage.setItem('kk_bookings', JSON.stringify(bookings));
      alert(`Successfully requested booking for ${vehicle.name}. An agent will call you shortly.`);
    };

    window.viewDetails = function (id) {
      const v = vehicles.find(x => x.id === id);
      if (v) alert(v.name + '\\n\\n' + v.specs + '\\n' + v.terms + '\\nPrice: INR ' + v.price + '/day');
    }

    function renderVehicles(list) {
      vehicleCards.innerHTML = '';
      const empty = document.getElementById('emptyState');
      if (empty) empty.style.display = list.length === 0 ? 'block' : 'none';

      list.forEach(vehicle => {
        const div = document.createElement('div');
        div.className = 'rental-card';
        div.innerHTML = `
                <img src="${vehicle.image}" alt="${vehicle.name}" loading="lazy">
                <div class="rental-card-body">
                  <div class="rental-card-header">
                    <h3 class="rental-card-title">${vehicle.name}</h3>
                    <div class="vehicle-pills">
                      <span class="vehicle-pill">${vehicle.type}</span>
                      <span class="vehicle-pill secondary">${vehicle.city}</span>
                    </div>
                  </div>
                  <p class="rental-card-specs">${vehicle.seats} seats • ${vehicle.fuel} • ${vehicle.transmission}</p>
                  <div class="rental-card-price-row">
                    <p class="rental-card-price">₹${vehicle.price}<span>/day</span></p>
                    <p class="rental-card-meta">No hidden charges • GST invoice available</p>
                  </div>
                  <p class="rental-card-terms">${vehicle.terms}</p>
                  <div class="rental-card-actions">
                    <button type="button" class="btn btn-accent" onclick="bookVehicle(${vehicle.id})" ${!vehicle.available ? 'disabled' : ''}>
                      ${vehicle.available ? 'Book now' : 'Unavailable'}
                    </button>
                    <button type="button" class="btn btn-outline" onclick="viewDetails(${vehicle.id})">Details</button>
                  </div>
                </div>
             `;
        vehicleCards.appendChild(div);
      });
    }

    window.applyFilters = function () {
      const type = document.getElementById('rentalType').value;
      const city = document.getElementById('rentalCity').value;
      const maxPrice = parseInt(document.getElementById('rentalPrice').value) || Infinity;
      const minSeats = parseInt(document.getElementById('rentalSeats').value) || 0;
      filteredVehicles = vehicles.filter(v =>
        (type === 'all' || v.type === type) &&
        (city === 'all' || v.city === city) &&
        (v.price <= maxPrice) &&
        (v.seats >= minSeats) &&
        v.available
      );
      renderVehicles(filteredVehicles);
    };

    const filterBtn = document.getElementById('applyFilters');
    if (filterBtn) filterBtn.addEventListener('click', applyFilters);

    ['rentalType', 'rentalCity', 'rentalPrice', 'rentalSeats'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', applyFilters);
    });

    renderVehicles(filteredVehicles);
  }

  // Admin Page: Data Population
  const adminTable = document.querySelector('.admin-section .data-table tbody');
  if (adminTable) {
    // Check auth constraints
    const userStr = localStorage.getItem('kk_current_user');
    const user = userStr ? JSON.parse(userStr) : null;
    if (!user || user.role !== 'admin') {
      alert('Access Denied: Admin privileges required.');
      window.location.href = 'index.html';
      return;
    }

    const users = JSON.parse(localStorage.getItem('kk_users') || '[]');
    const bookings = JSON.parse(localStorage.getItem('kk_bookings') || '[]');

    // Update quick stats (mocked some values, realistic others)
    const stats = document.querySelectorAll('.stat-card-value');
    if (stats.length >= 4) {
      stats[0].innerHTML = users.length;
      stats[1].innerHTML = bookings.filter(b => b.status === 'Active Trip').length;
      stats[2].innerHTML = bookings.filter(b => b.status === 'Pending').length;

      let revenue = bookings.reduce((sum, b) => b.status !== 'Pending' ? sum + b.price : sum, 0);
      stats[3].innerHTML = '₹' + revenue.toLocaleString('en-IN');
    }

    // Update table
    adminTable.innerHTML = '';
    if (bookings.length === 0) {
      adminTable.innerHTML = '<tr><td colspan="6" style="text-align:center;">No recent bookings found.</td></tr>';
    } else {
      bookings.slice().reverse().forEach(b => {
        const statusClass = b.status === 'Pending' ? 'status-pending' : 'status-active';
        const tr = document.createElement('tr');
        tr.innerHTML = `
                <td>#${b.id}</td>
                <td>${b.customerName}</td>
                <td>${b.vehicleName}</td>
                <td>${b.date}</td>
                <td><span class="status-badge ${statusClass}">${b.status}</span></td>
                <td>
                  <button class="btn btn-outline" style="padding:4px 10px;font-size:11px;" onclick="alert('Manage Booking ${b.id}')">Manage</button>
                </td>
             `;
        adminTable.appendChild(tr);
      });
    }
  }
});
