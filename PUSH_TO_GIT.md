# Push Swag Vastra to Git - Step by Step Guide

## Step 1: Configure Git (First Time Only)

If this is your first time using Git, configure your identity:

```powershell
# Set your name
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"
```

**Example:**
```powershell
git config --global user.name "John Doe"
git config --global user.email "john.doe@gmail.com"
```

## Step 2: Verify Git Configuration

```powershell
git config --global user.name
git config --global user.email
```

## Step 3: Create GitHub Repository

1. Go to https://github.com
2. Click the "+" icon in top right
3. Click "New repository"
4. Repository name: `swag-vastra` (or any name you prefer)
5. Description: "AI-Powered Fashion Recommendation System"
6. Choose: Public or Private
7. **DO NOT** initialize with README (we already have one)
8. Click "Create repository"

## Step 4: Commit Your Code

```powershell
cd swag-vastra

# Commit all changes
git commit -m "Initial commit: Swag Vastra - AI-Powered Fashion Recommendation System"
```

## Step 5: Add Remote Repository

Copy the repository URL from GitHub (it looks like: `https://github.com/yourusername/swag-vastra.git`)

```powershell
# Add remote (replace with your actual GitHub URL)
git remote add origin https://github.com/yourusername/swag-vastra.git

# Verify remote was added
git remote -v
```

## Step 6: Push to GitHub

```powershell
# Push to main branch
git push -u origin main
```

If you get an authentication error, you may need to:
- Use a Personal Access Token (PAT) instead of password
- Or use GitHub Desktop
- Or use SSH keys

### Option A: Using Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "Swag Vastra"
4. Select scopes: `repo` (full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When pushing, use the token as your password

### Option B: Using GitHub Desktop (Easiest)

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in
3. File → Add Local Repository
4. Choose the `swag-vastra` folder
5. Click "Publish repository"

### Option C: Using SSH Keys

```powershell
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Copy public key
Get-Content ~/.ssh/id_ed25519.pub | clip

# Add to GitHub: Settings → SSH and GPG keys → New SSH key
# Paste the key and save

# Change remote to SSH
git remote set-url origin git@github.com:yourusername/swag-vastra.git

# Push
git push -u origin main
```

## Step 7: Verify on GitHub

1. Go to your GitHub repository
2. Refresh the page
3. You should see all your files!

## Complete Command Sequence

Here's the complete sequence of commands:

```powershell
# 1. Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 2. Navigate to project
cd swag-vastra

# 3. Commit changes
git commit -m "Initial commit: Swag Vastra - AI-Powered Fashion Recommendation System"

# 4. Add remote (replace with your GitHub URL)
git remote add origin https://github.com/yourusername/swag-vastra.git

# 5. Push to GitHub
git push -u origin main
```

## Future Updates

After the initial push, to update your repository:

```powershell
# 1. Check what changed
git status

# 2. Add all changes
git add .

# 3. Commit with a message
git commit -m "Description of changes"

# 4. Push to GitHub
git push
```

## Common Issues

### Issue: "fatal: unable to auto-detect email address"
**Solution:** Run the git config commands in Step 1

### Issue: "Authentication failed"
**Solution:** Use a Personal Access Token instead of password (see Option A above)

### Issue: "remote origin already exists"
**Solution:** 
```powershell
git remote remove origin
git remote add origin https://github.com/yourusername/swag-vastra.git
```

### Issue: "Updates were rejected"
**Solution:**
```powershell
git pull origin main --rebase
git push origin main
```

## What Gets Pushed?

✅ **Included:**
- All source code
- Documentation files
- Configuration files (.env.example)
- Package files (package.json, requirements.txt)
- README and guides

❌ **Excluded (in .gitignore):**
- node_modules/
- venv/
- .env (sensitive data)
- uploads/
- .next/
- __pycache__/
- Log files

## Repository Structure on GitHub

```
swag-vastra/
├── 📄 README.md (Main documentation)
├── 📄 AI_MODELS_DOCUMENTATION.md (AI models explained)
├── 📄 ENHANCED_SETUP_GUIDE.md (Setup instructions)
├── 📄 CHANGES_SUMMARY.md (Feature list)
├── 📁 ai-service/ (Python AI service)
├── 📁 backend/ (Node.js API)
├── 📁 frontend/ (Next.js app)
└── 📁 documentation files
```

## After Pushing

Share your repository:
```
https://github.com/yourusername/swag-vastra
```

Add a nice description on GitHub:
- Go to repository settings
- Add description: "AI-Powered Fashion Recommendation System using MediaPipe, K-Means, and HSV color analysis"
- Add topics: `ai`, `fashion`, `recommendation-system`, `computer-vision`, `nextjs`, `nodejs`, `python`

## Need Help?

If you encounter any issues:
1. Check the error message carefully
2. Google the error message
3. Check GitHub documentation: https://docs.github.com
4. Use GitHub Desktop for easier workflow

---

**Congratulations!** 🎉 Your Swag Vastra project is now on GitHub!
