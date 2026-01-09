# 🤝 Contributing to Booking System

Cảm ơn bạn đã quan tâm đến việc đóng góp cho dự án Booking System! Tài liệu này sẽ hướng dẫn bạn cách contribute một cách hiệu quả.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## 📜 Code of Conduct

### Our Pledge
Chúng tôi cam kết tạo ra một môi trường thân thiện, chào đón mọi người bất kể:
- Tuổi tác, giới tính, bản dạng giới tính
- Khuyết tật, ngoại hình
- Dân tộc, quốc tịch
- Tôn giáo, quan điểm chính trị
- Kinh nghiệm lập trình

### Expected Behavior
- Sử dụng ngôn ngữ chào đón và inclusive
- Tôn trọng quan điểm và kinh nghiệm khác nhau
- Chấp nhận constructive criticism
- Tập trung vào điều tốt nhất cho cộng đồng
- Thể hiện empathy với các thành viên khác

### Unacceptable Behavior
- Ngôn ngữ hoặc hình ảnh tình dục
- Trolling, insulting, hoặc derogatory comments
- Harassment công khai hoặc riêng tư
- Publishing thông tin cá nhân của người khác
- Hành vi không professional khác

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ và npm
- Git
- Code editor (VS Code recommended)
- Basic knowledge về JavaScript, Express.js, EJS

### First Time Setup
1. **Fork repository**
   ```bash
   # Click "Fork" button trên GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Booking-System.git
   cd Booking-System
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/DYBInh2k5/Booking-System.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm start
   ```

## 🛠️ Development Setup

### Environment Variables
Tạo file `.env` trong root directory:
```env
NODE_ENV=development
SESSION_SECRET=your-development-secret-key
PORT=3000
```

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- GitLens
- Thunder Client (for API testing)

### Development Workflow
1. **Sync với upstream**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Tạo feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes và test**
   ```bash
   npm start  # Test locally
   ```

4. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push và create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🎯 How to Contribute

### Types of Contributions

#### 🐛 Bug Reports
- Use GitHub Issues
- Include steps to reproduce
- Provide system information
- Add screenshots if applicable

#### ✨ Feature Requests
- Check existing issues first
- Describe the problem you're solving
- Provide detailed requirements
- Consider implementation approach

#### 📝 Documentation
- Fix typos và grammar
- Improve clarity
- Add examples
- Translate to other languages

#### 💻 Code Contributions
- Bug fixes
- New features
- Performance improvements
- Refactoring

### Areas Needing Help

#### High Priority:
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Payment gateway integration
- [ ] Email notification system
- [ ] Unit testing setup
- [ ] Security enhancements

#### Medium Priority:
- [ ] Advanced search filters
- [ ] User reviews system
- [ ] Admin dashboard
- [ ] Mobile responsiveness improvements
- [ ] Performance optimization

#### Low Priority:
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Social media integration
- [ ] Advanced analytics
- [ ] Mobile app

## 📏 Coding Standards

### JavaScript Style Guide
Chúng tôi follow **Airbnb JavaScript Style Guide** với một số modifications:

#### General Rules:
- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Use camelCase for variables và functions
- Use PascalCase for constructors và classes

#### Example:
```javascript
// ✅ Good
const userName = 'john_doe';
const userAge = 25;

function getUserInfo(userId) {
  return {
    name: userName,
    age: userAge
  };
}

// ❌ Bad
const user_name = "john_doe"
const UserAge = 25

function get_user_info(user_id) {
  return {
    name: user_name,
    age: UserAge
  }
}
```

### File Naming Conventions
- Use kebab-case for files: `user-controller.js`
- Use camelCase for directories: `userModels/`
- Use PascalCase for components: `UserProfile.js`

### Comment Guidelines
```javascript
// ✅ Good: Explain WHY, not WHAT
// Calculate total price including taxes and fees
const totalPrice = basePrice * (1 + taxRate) + fees;

// ❌ Bad: Obvious comments
// Add 1 to counter
counter = counter + 1;
```

### Error Handling
```javascript
// ✅ Good: Proper error handling
try {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
} catch (error) {
  logger.error('Error fetching user:', error);
  throw error;
}

// ❌ Bad: Silent failures
const user = await User.findById(userId);
return user; // Could be null
```

## 🧪 Testing Guidelines

### Test Structure
```javascript
describe('User Authentication', () => {
  beforeEach(() => {
    // Setup test data
  });

  afterEach(() => {
    // Cleanup
  });

  it('should register new user successfully', async () => {
    // Arrange
    const userData = {
      email: 'test@example.com',
      password: 'password123'
    };

    // Act
    const result = await authService.register(userData);

    // Assert
    expect(result.success).toBe(true);
    expect(result.user.email).toBe(userData.email);
  });
});
```

### Test Categories
- **Unit Tests:** Test individual functions
- **Integration Tests:** Test API endpoints
- **E2E Tests:** Test user workflows

### Running Tests
```bash
npm test              # Run all tests
npm run test:unit     # Run unit tests only
npm run test:e2e      # Run E2E tests
npm run test:coverage # Generate coverage report
```

## 📝 Pull Request Process

### Before Submitting PR

#### Checklist:
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No merge conflicts

### PR Title Format
Use conventional commits format:
```
type(scope): description

Examples:
feat(auth): add JWT authentication
fix(booking): resolve date validation bug
docs(readme): update installation guide
refactor(search): optimize query performance
```

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
```

### Review Process
1. **Automated Checks:** CI/CD pipeline runs
2. **Code Review:** At least 1 reviewer approval
3. **Testing:** All tests must pass
4. **Merge:** Squash and merge preferred

## 🐛 Issue Guidelines

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
Add screenshots if applicable

**Environment**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Node.js version: [e.g. 16.14.0]
```

### Feature Request Template
```markdown
**Feature Description**
Clear description of the feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this be implemented?

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Any other context or screenshots
```

### Issue Labels
- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed
- `priority-high`: High priority
- `priority-medium`: Medium priority
- `priority-low`: Low priority

## 🏆 Recognition

### Contributors Wall
Outstanding contributors sẽ được featured trong:
- README.md contributors section
- Monthly newsletter
- Social media shoutouts

### Contribution Levels
- **🌟 Contributor:** 1+ merged PR
- **⭐ Regular Contributor:** 5+ merged PRs
- **🚀 Core Contributor:** 15+ merged PRs + ongoing involvement
- **💎 Maintainer:** Trusted with repository access

## 📞 Getting Help

### Communication Channels
- **GitHub Issues:** Bug reports, feature requests
- **GitHub Discussions:** General questions, ideas
- **Email:** binh.vd01500@sinhvien.hoasen.edu.vn

### Response Times
- **Bug reports:** 24-48 hours
- **Feature requests:** 3-5 days
- **Pull requests:** 2-3 days
- **General questions:** 1-2 days

## 📚 Resources

### Learning Resources
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/guide/)
- [EJS Documentation](https://ejs.co/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)

### Tools
- [Postman](https://postman.com/) - API testing
- [MongoDB Compass](https://mongodb.com/compass) - Database GUI
- [Git Kraken](https://gitkraken.com/) - Git GUI

---

🙏 **Thank you for contributing to Booking System!** Your efforts help make this project better for everyone.