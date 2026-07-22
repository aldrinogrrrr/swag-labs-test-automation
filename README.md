# 🚀 Swag Labs Test Automation Suite

## 📋 Overview

A clean, focused test automation suite for the Swag Labs demo e-commerce application, built with Playwright and the Page Object Model pattern.

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/aldrinogrrrr/swag-labs-test-automation.git
cd swag-labs-test-automation

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# (Optional: Edit .env if you need to change credentials)

# 4. Install Playwright browsers
npx playwright install

# 5. Run the tests
npm test
```

### Running Specific Tests

```bash
# Run all tests
npm test

# Run smoke tests only
npm run test:smoke

# Run regression tests only
npm run test:regression

# Run tests in headed mode (see the browser)
npx playwright test --headed

# Run a specific test file
npx playwright test tests/login.spec.js

# Run with debug mode
npx playwright test --debug

# View test report
npx playwright show-report
```

---

## 🛠️ Tools & Why

### Core Framework: **Playwright**
**Why Playwright?**
I picked Playwright mainly because I wanted a tool that wouldn't fight me on the basics, so I could spend my time on actual test coverage instead of babysitting flaky runs.
 
- **Cross-browser support** - I can run the same suite against Chromium, Firefox, and WebKit without maintaining separate setups for each. For a demo app like this, it meant I could show breadth of coverage without extra effort.
- **Auto-waiting** - This was the big one for me. With tools that don't auto-wait, I've lost hours chasing "flaky" failures that were really just timing issues. Playwright waits for elements to actually be ready before interacting with them, so my tests fail because something's actually broken, not because the page was a beat too slow.
- **Built-in API testing** - I didn't want to bring in a second library just to hit an endpoint. Being able to do UI and API checks in the same framework kept the project simpler and easier to maintain.
- **Trace viewer** - When a test fails, I don't want to guess why. The trace viewer gives me screenshots, network logs, and a timeline of what happened, so debugging is more "here's the exact moment it broke" and less trial and error.
- **Parallel execution** - Running things in parallel out of the box meant faster feedback, which matters more than it sounds like once your suite grows past a handful of tests.
- **Native support for modern web features** - I didn't have to think about SPA quirks or shadow DOM edge cases; Playwright handles them natively, so I wasn't writing workarounds for things that should just work.

### Additional Tools

| Tool | Purpose | Why Chosen |
|------|---------|------------|
| **dotenv** | Environment Management | Keeps credentials secure, easy to switch environments |
| **Page Object Model** | Test Organization | Clean separation of locators, pages, and tests |
| **Tagging Strategy** | Test Execution | Run specific test suites (@smoke, @regression) |

---

## 🎯 Testing Strategy

### Focus on UI Layer
This suite focuses on UI testing because:
1. **The application is UI-heavy** - The Swag Labs demo is primarily a frontend application
2. **User experience matters** - Testing UI ensures real user journeys work correctly
3. **Negative cases are critical** - UI validation catches user-facing errors

### Coverage Breakdown

**UI Tests:**
- ✅ Login functionality (positive and negative cases)
- ✅ Product browsing
- ✅ Shopping cart operations
- ✅ Checkout flow

**Key Areas Tested:**
- Valid/invalid credentials
- Cart additions and removals
- Complete purchase flow
- Error message validation

---

## 🏗️ Project Structure

```
swag-labs-test-automation/
├── tests/
│   ├── login.spec.js              # Login test suite
│   ├── homepage.view.spec.js      # Homepage validation
│   ├── homepage.create.spec.js    # Add items to cart
│   ├── cartPage.view.spec.js      # Cart page validation
│   ├── cartPage.create.spec.js    # Cart operations
│   └── inventorypage.view.spec.js # Product browsing
│
├── pages/                         # Page Object Models
│   ├── loginPage.js
│   ├── homePage.js
│   ├── cartPage.js
│   ├── checkoutPage.js
│   └── inventoryPage.js
│
├── locators/                      # Page locators
│   ├── loginPageLocators.js
│   ├── homePageLocators.js
│   ├── cartPageLocators.js
│   ├── checkoutPageLocators.js
│   └── inventoryPageLocators.js
│
├── ui-labels/                     # UI text constants
│   ├── login-ui-labels.js
│   └── checkout-ui-labels.js
│
├── test-data/                     # Test data
│   └── order-test-data.js
│
├── playwright.config.js           # Playwright configuration
├── .env.example                   # Environment template
├── .gitignore
├── package.json
└── README.md
```

---

## 🔮 What I Would Add With More Time
 
This suite covers the core flows well, but I kept scope tight on purpose. Here's what I'd tackle next if this were a real production project instead of a focused demo.
 
### 1. **Visual Regression Testing**
Functional tests can pass while the UI quietly breaks — a button shifts, a modal overlaps text, and nothing in the assertions catches it. I'd add screenshot comparisons on critical pages so visual drift gets flagged automatically instead of relying on someone noticing it manually.
- Screenshot comparisons for critical pages
- Detect unexpected visual changes
### 2. **API Layer Testing**
Right now everything goes through the UI, which is realistic but slow. For things like setting up cart state before a test, I'd rather hit the API directly and save the UI clicks for what's actually being tested.
- Direct API calls for cart operations
- Faster test execution for data validation
### 3. **CI/CD Pipeline**
A test suite that only runs when I remember to run it isn't pulling its weight. I'd wire this into GitHub Actions (or similar) so tests run automatically on every PR, with results posted right in the PR thread and a scheduled run to catch anything environmental that slips through.
- Automated test runs on PRs
- Test results posted to PR comments
- Scheduled test runs
### 4. **Test Data Management**
Inline test data works fine at this scale, but it doesn't scale gracefully. I'd move toward a factory pattern so test data is generated consistently and I'm not hunting through spec files to update a hardcoded value in five places.
- Factory pattern for test data
- Data seeding for consistent tests
### 5. **Mobile Testing**
Swag Labs isn't heavily responsive, but most real apps are, and I'd want this suite to reflect that. I'd add mobile viewport configurations to catch layout and interaction issues that only show up at smaller screen sizes.
- Responsive design validation
- Mobile viewport configurations
### 6. **Advanced Reporting**
The default Playwright HTML report is fine for a solo project, but for a team I'd want more visibility into trends — is a particular test getting flaky over time, is failure rate creeping up. Allure or a similar reporting layer would give that history instead of just a snapshot of the last run.
- Allure reporting
- Test flakiness detection
- Historical test trend analysis


---

## 🤖 AI Tooling Usage
 
### How AI Was Used
I used Claude (Anthropic) throughout development, but purely through prompting in chat — no agentic or auto-run coding tools involved. I'd ask for code review, get a second opinion on structure, or have it explain a pattern I wasn't sure about, then I'd read through what it gave me, test it myself, and decide what actually made it into the codebase. Nothing went in unreviewed.
 
### What I Accepted
Most of what I kept were things that would've taken me time to type out or get right on the first try, but weren't really decisions — more like solid defaults I agreed with.
- ✅ **Page Object structure** - Class patterns and organization
- ✅ **Method naming conventions** - Verb-first naming
- ✅ **Tagging strategy** - @smoke, @regression implementation
- ✅ **Environment variable management** - dotenv setup
- ✅ **Basic assertion patterns** - Proper use of `expect`
- ✅ **Code formatting** - Consistent spacing and structure


### What I Corrected or Rewrote
This is the part that actually took judgment — knowing when a suggestion was technically working but wrong for this project.
 
1. **Over-engineering**
   - ❌ AI suggested complex abstraction layers and factories
   - ✅ Kept it simple with basic Page Object Model
   - **Reason**: This is a focused demo suite, not a large enterprise codebase. Adding factories and abstraction layers here would've been solving a problem I didn't have.
2. **Flaky Test Patterns**
   - ❌ AI suggested `waitForTimeout()` with fixed delays
   - ✅ Replaced with `waitFor({ state: 'visible' })`
   - **Reason**: Fixed timeouts are exactly the kind of thing that makes tests flaky and slow. I've been burned by this before, so this was an easy one to catch and fix.
3. **Unnecessary Helper Methods**
   - ❌ AI added methods that weren't needed yet
   - ✅ Followed YAGNI (You Aren't Gonna Need It)
   - **Reason**: It's tempting to build for hypothetical future needs, but every unused method is just more surface area to maintain. I'd rather add it when I actually need it.
4. **Test Data Complexity**
   - ❌ AI wanted complex data fixtures
   - ✅ Used environment variables and inline test data
   - **Reason**: For a suite this size, a fixtures system would've added more overhead than value. Simple wins here.
5. **Assertion Quality**
   - ❌ AI suggested generic assertions
   - ✅ Added specific, meaningful assertions
   - **Reason**: A passing test that isn't checking anything meaningful is worse than no test at all — it gives false confidence. I made sure each assertion actually validated the behavior I cared about.


### AI Lessons Learned
Working with AI on this project reinforced a few things I already believed but hadn't tested this directly:
- **AI is a great pair programmer** but shouldn't replace critical thinking
- **Always review AI suggestions** - some are over-engineered
- **Test the AI's code** - it can be subtly broken
- **Use AI for structure** but write the business logic yourself
- **The best AI suggestion** was proper tagging and test organization


---

## 📊 Running Tests

```bash
# Full test suite
npm test

# Smoke tests (critical path)
npm run test:smoke

# Regression tests (full suite)
npm run test:regression

# With HTML report
npm run test:report

# Debug mode
npm run test:debug
```

---

## 📈 Test Report

After test execution, view the HTML report:
```
playwright-report/index.html
```

---

## 🎯 Quality Highlights

**Clean Code:**
- Consistent formatting
- Meaningful variable names
- Single responsibility methods
- No unnecessary complexity

**Robust Assertions:**
- URL validation
- Element visibility
- Text content verification
- Error message validation

**Test Maintainability:**
- Page Object Model
- Centralized locators
- Environment configuration
- Clear naming conventions

---

## 🏁 Summary

This test automation suite demonstrates:
- ✅ **Clean, focused code** - No over-engineering
- ✅ **Proper Page Object Model** - Good separation of concerns
- ✅ **Meaningful assertions** - Both positive and negative cases
- ✅ **Effective use of AI** - Accepted good suggestions, humanized the rest
- ✅ **Production-ready** - Runs as documented

---

**Repository:** [aldrinogrrrr/swag-labs-test-automation](https://github.com/aldrinogrrrr/swag-labs-test-automation)

**Setup & Run:** See installation instructions above.
