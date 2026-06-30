$ErrorActionPreference = "Stop"

$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$OutDir = Join-Path $Root "migration-export"
$Key = "C:\Users\ivanp\.ssh\contabo_codex"
$HostName = "80.241.221.155"
$User = "codex"

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$remoteScript = @'
set -euo pipefail
wp_cid=$(sudo -n docker ps --filter name=webs_titulotransporte.1 --format '{{.ID}}' | head -1)
db_cid=$(sudo -n docker ps --filter name=webs_titulotransporte-db.1 --format '{{.ID}}' | head -1)
stamp=$(date +%Y%m%d-%H%M%S)
work="/tmp/titulotransporte-export-$stamp"
mkdir -p "$work"

mysql_cmd='mysql -umysql -p"$MYSQL_PASSWORD" webs --default-character-set=utf8mb4 -N'
mysql_json='mysql -umysql -p"$MYSQL_PASSWORD" webs --default-character-set=utf8mb4 --batch --raw'

sudo -n docker exec "$db_cid" bash -lc "$mysql_cmd -e \"select ID, post_type, post_status, post_name, post_title, post_date, post_modified from wp_posts where post_status in ('publish','private') order by post_type, post_date;\"" > "$work/posts.tsv"
sudo -n docker exec "$db_cid" bash -lc "$mysql_cmd -e \"select post_id, meta_key, meta_value from wp_postmeta where meta_key like 'rank_math_%' or meta_key in ('_price','_regular_price','_sale_price','_stock_status','_virtual','_downloadable','_thumbnail_id','_product_image_gallery');\"" > "$work/postmeta-selected.tsv"
sudo -n docker exec "$db_cid" bash -lc "$mysql_cmd -e \"select option_name, option_value from wp_options where option_name in ('siteurl','home','blogname','blogdescription','permalink_structure','stylesheet','template','active_plugins','woocommerce_permalinks');\"" > "$work/options.tsv"
sudo -n docker exec "$db_cid" bash -lc "$mysql_cmd -e \"select ID, post_name, post_title, post_content from wp_posts where post_type='pregunta' and post_status='publish';\"" > "$work/questions.tsv"
sudo -n docker exec "$db_cid" bash -lc "$mysql_cmd -e \"select * from wp_arm_subscription_plans;\"" > "$work/arm-plans.tsv"
sudo -n docker exec "$db_cid" bash -lc "$mysql_cmd -e \"select id, status, currency, total_amount, date_created_gmt from wp_wc_orders order by date_created_gmt desc limit 200;\"" > "$work/orders-sample.tsv" || true

sudo -n docker exec "$wp_cid" bash -lc "find wp-content/uploads -maxdepth 4 -type f | sed 's#^#/#'" > "$work/uploads-files.txt"
sudo -n docker exec "$wp_cid" bash -lc "find wp-content/plugins -maxdepth 1 -mindepth 1 -type d -printf '%f\n' | sort" > "$work/plugins.txt"
sudo -n docker exec "$wp_cid" bash -lc "find wp-content/themes -maxdepth 2 -type f -name style.css -print" > "$work/themes.txt"

tar -czf "$work.tar.gz" -C "$work" .
echo "$work.tar.gz"
'@

$remoteArchive = $remoteScript | ssh -i $Key -o IdentitiesOnly=yes "$User@$HostName" "bash -s"
$remoteArchive = ($remoteArchive | Select-Object -Last 1).Trim()

scp -i $Key -o IdentitiesOnly=yes "${User}@${HostName}:$remoteArchive" (Join-Path $OutDir "wordpress-export.tar.gz")

Write-Host "Export created at $(Join-Path $OutDir 'wordpress-export.tar.gz')"
