BUILD_DIR=source-firefox
SRC_DIR=source

all: clean copy swap-background add-id swap-agent

clean:
	rm -rf $(BUILD_DIR)

copy:
	cp -R $(SRC_DIR) $(BUILD_DIR)

swap-background:
	sed -i.bak 's/"service_worker": "service_worker.js"/"scripts": ["service_worker.js"]/' $(BUILD_DIR)/manifest.json
	rm -f $(BUILD_DIR)/manifest.json.bak

add-id:
	sed -i.bak 's/"manifest_version": 3/"manifest_version": 3,"browser_specific_settings": {"gecko": {"id": "id@antigram.org","data_collection_permissions": {"required": ["none"]}}}/' $(BUILD_DIR)/manifest.json
	rm -f $(BUILD_DIR)/manifest.json.bak

swap-agent:
	sed -i.bak 's/chrome/firefox/' $(BUILD_DIR)/service_worker.js
	rm -f $(BUILD_DIR)/service_worker.js.bak