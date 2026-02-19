# Quick Git Setup Script for Swag Vastra
# Run this script to configure Git and push to GitHub

Write-Host "=== Swag Vastra - Git Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "   Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit
}
Write-Host ""

# Step 1: Configure Git
Write-Host "Step 1: Configure Git Identity" -ForegroundColor Yellow
Write-Host ""

$currentName = git config --global user.name
$currentEmail = git config --global user.email

if ($currentName -and $currentEmail) {
    Write-Host "Current Git configuration:" -ForegroundColor Green
    Write-Host "  Name: $currentName" -ForegroundColor Gray
    Write-Host "  Email: $currentEmail" -ForegroundColor Gray
    Write-Host ""
    $change = Read-Host "Do you want to change this? (y/n)"
    if ($change -eq 'y') {
        $name = Read-Host "Enter your name"
        $email = Read-Host "Enter your email"
        git config --global user.name "$name"
        git config --global user.email "$email"
        Write-Host "✅ Git configured!" -ForegroundColor Green
    }
} else {
    Write-Host "Git is not configured yet." -ForegroundColor Yellow
    $name = Read-Host "Enter your name (e.g., John Doe)"
    $email = Read-Host "Enter your email (e.g., john@example.com)"
    
    git config --global user.name "$name"
    git config --global user.email "$email"
    
    Write-Host "✅ Git configured successfully!" -ForegroundColor Green
}
Write-Host ""

# Step 2: Add remaining files
Write-Host "Step 2: Adding files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added" -ForegroundColor Green
Write-Host ""

# Step 3: Commit
Write-Host "Step 3: Creating commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Swag Vastra - AI-Powered Fashion Recommendation System with multi-step wizard"
Write-Host "✅ Commit created" -ForegroundColor Green
Write-Host ""

# Step 4: Remote repository
Write-Host "Step 4: Add GitHub Repository" -ForegroundColor Yellow
Write-Host ""
Write-Host "Please create a repository on GitHub first:" -ForegroundColor Cyan
Write-Host "  1. Go to https://github.com/new" -ForegroundColor White
Write-Host "  2. Repository name: swag-vastra" -ForegroundColor White
Write-Host "  3. Choose Public or Private" -ForegroundColor White
Write-Host "  4. DO NOT initialize with README" -ForegroundColor White
Write-Host "  5. Click 'Create repository'" -ForegroundColor White
Write-Host ""

$repoUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/swag-vastra.git)"

if ($repoUrl) {
    # Check if remote already exists
    $existingRemote = git remote get-url origin 2>$null
    if ($existingRemote) {
        Write-Host "Remote 'origin' already exists. Removing..." -ForegroundColor Yellow
        git remote remove origin
    }
    
    git remote add origin $repoUrl
    Write-Host "✅ Remote repository added" -ForegroundColor Green
    Write-Host ""
    
    # Step 5: Push
    Write-Host "Step 5: Pushing to GitHub..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Note: You may need to enter your GitHub credentials" -ForegroundColor Cyan
    Write-Host "      Use Personal Access Token instead of password" -ForegroundColor Cyan
    Write-Host ""
    
    try {
        git push -u origin main
        Write-Host ""
        Write-Host "🎉 SUCCESS! Your code is now on GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "View your repository at:" -ForegroundColor Cyan
        Write-Host "  $repoUrl" -ForegroundColor White
    } catch {
        Write-Host ""
        Write-Host "❌ Push failed!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Common solutions:" -ForegroundColor Yellow
        Write-Host "  1. Use GitHub Desktop (easier): https://desktop.github.com/" -ForegroundColor White
        Write-Host "  2. Use Personal Access Token instead of password" -ForegroundColor White
        Write-Host "  3. Set up SSH keys" -ForegroundColor White
        Write-Host ""
        Write-Host "See PUSH_TO_GIT.md for detailed instructions" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ No repository URL provided" -ForegroundColor Red
    Write-Host ""
    Write-Host "To push later, run:" -ForegroundColor Yellow
    Write-Host "  git remote add origin <your-repo-url>" -ForegroundColor White
    Write-Host "  git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Check your GitHub repository" -ForegroundColor White
Write-Host "  2. Add a nice description and topics" -ForegroundColor White
Write-Host "  3. Share your project!" -ForegroundColor White
Write-Host ""
