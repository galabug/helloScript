chcp 65001	
echo "同步开始--------------->"
git pull --verbose 

git add . 

git commit -m "auto commit" 

git push --verbose
echo "同步完成<---------------"
pause