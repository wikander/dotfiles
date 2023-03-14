git branch scrap
git reset --hard @{upstream}
# 1 är senaste commit 2 nästa senaste ock så vidare
git cherry-pick scrap~1
git branch -D scrap