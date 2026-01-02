#!/bin/bash

# Deploy to GitHub Script
# This script helps you push your code to GitHub

echo "🚀 The Mindful Musicpreneur - GitHub Deployment Helper"
echo "======================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git is not initialized in this directory"
    exit 1
fi

echo "📝 Please enter your GitHub repository URL"
echo "   (e.g., https://github.com/YOUR_USERNAME/mindful-musicpreneur-app.git)"
read -p "Repository URL: " repo_url

if [ -z "$repo_url" ]; then
    echo "❌ Error: Repository URL cannot be empty"
    exit 1
fi

echo ""
echo "🔗 Adding remote repository..."
git remote remove origin 2>/dev/null  # Remove existing origin if any
git remote add origin "$repo_url"

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to add remote repository"
    exit 1
fi

echo "✅ Remote repository added successfully"
echo ""
echo "📤 Pushing code to GitHub..."

git push -u origin master

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Next Steps:"
    echo "   1. Go to Vercel: https://vercel.com"
    echo "   2. Import your GitHub repository"
    echo "   3. Follow the VERCEL_DEPLOYMENT.md guide for detailed instructions"
    echo ""
else
    echo ""
    echo "❌ Failed to push to GitHub"
    echo ""
    echo "💡 Possible issues:"
    echo "   - You may need to authenticate with GitHub"
    echo "   - Use a Personal Access Token instead of password"
    echo "   - Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh"
    echo ""
    echo "🔄 To try again, run: git push -u origin master"
fi
