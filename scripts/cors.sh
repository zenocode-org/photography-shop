#aws configure
aws s3api put-bucket-cors --bucket photography-shop-public --cors-configuration '{"CORSRules":[{"AllowedHeaders":["*"],"AllowedMethods":["GET","PUT"],"AllowedOrigins":["http://localhost:*","https://{VERCEL_PROJECT_NAME}*.vercel.app","{PRODUCTION_DOMAIN}"],"ExposeHeaders":["Access-Control-Allow-Origin"]}]}'