# Git and GitHub Setup

## Commit email

Use the exact GitHub-provided `noreply` email shown in:

GitHub Settings > Emails > Keep my email addresses private

The email normally resembles:

```text
12345678+tharunsasanka@users.noreply.github.com
```

Do not copy the example. Use the exact address displayed in your GitHub account.

The commit email is not uploaded as a project file. Git stores it in the local repository configuration.

## Configure this repository

```powershell
git config user.name "Tharun Sasanka"
git config user.email "PASTE_YOUR_EXACT_GITHUB_NOREPLY_EMAIL"
git config user.name
git config user.email
```

A second email address also works when it has been added to the same GitHub account and verified. The GitHub-provided `noreply` email is recommended for privacy.

## Create the first commit

```powershell
git init
git branch -M main
git add .
git commit -m "chore: initialize Sripalee College digital platform"
```

## Connect the GitHub repository

Create a new empty GitHub repository named:

```text
sripalee-college-digital-platform
```

Then run:

```powershell
git remote add origin https://github.com/tharunsasanka/sripalee-college-digital-platform.git
git push -u origin main
```

## Verify the commit identity

```powershell
git log -1 --format="%h | %an | %ae"
```

## Professional branch and pull-request workflow

```powershell
git switch -c feat/homepage-foundation
git add .
git commit -m "feat: build animated homepage foundation"
git push -u origin feat/homepage-foundation
```

Open a pull request on GitHub and merge it after review.

GitHub achievements depend on specific GitHub activities and are not guaranteed by the number of commits or by completing a project.
