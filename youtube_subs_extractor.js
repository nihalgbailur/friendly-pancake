// YouTube Subscriptions Extractor Script - Updated Version
// Run this in the browser console on youtube.com/feed/channels page

// Clear console to remove YouTube's internal warnings
console.clear();

function extractSubscriptions() {
    console.log('🚀 Starting YouTube subscription extraction...');
    console.log('📍 Make sure you are on: youtube.com/feed/channels');
    
    // Enhanced scroll function with progress indication
    function scrollToLoadAll() {
        return new Promise((resolve) => {
            console.log('📜 Scrolling to load all subscriptions...');
            let lastHeight = 0;
            let stableCount = 0;
            let scrollAttempts = 0;
            const maxAttempts = 50;
            
            const scrollInterval = setInterval(() => {
                window.scrollTo(0, document.body.scrollHeight);
                scrollAttempts++;
                
                setTimeout(() => {
                    const currentHeight = document.body.scrollHeight;
                    
                    if (currentHeight === lastHeight) {
                        stableCount++;
                    } else {
                        stableCount = 0;
                        console.log(`📜 Loading more... (attempt ${scrollAttempts})`);
                    }
                    
                    lastHeight = currentHeight;
                    
                    // Stop if height is stable for 3 attempts or max attempts reached
                    if (stableCount >= 3 || scrollAttempts >= maxAttempts) {
                        clearInterval(scrollInterval);
                        console.log('✅ Finished loading all subscriptions');
                        resolve();
                    }
                }, 1000);
            }, 1500);
        });
    }
    
    // Enhanced extraction with multiple fallback selectors
    async function extractChannels() {
        await scrollToLoadAll();
        
        // Wait for final content to render
        console.log('⏳ Waiting for content to stabilize...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log('🔍 Extracting channel data...');
        
        const channels = [];
        
        // Comprehensive list of selectors for different YouTube layouts
        const selectorSets = [
            // Main subscriptions page selectors
            {
                container: '#items ytd-channel-renderer, #contents ytd-channel-renderer, ytd-channel-renderer',
                name: '#text a, #channel-title, .ytd-channel-name a, #main-link, h3 a',
                url: '#text a, #main-link, .ytd-channel-name a, h3 a',
                subs: '#subscribers, .style-scope.ytd-video-meta-block, #subscriber-count'
            },
            // Grid layout selectors
            {
                container: '#items ytd-grid-channel-renderer, ytd-grid-channel-renderer',
                name: '#text a, #channel-title, .ytd-channel-name a, #main-link, h3 a',
                url: '#text a, #main-link, .ytd-channel-name a, h3 a',
                subs: '#subscribers, .style-scope.ytd-video-meta-block, #subscriber-count'
            },
            // Alternative layout selectors
            {
                container: '[class*="channel"] a[href*="/channel/"], [class*="channel"] a[href*="/@"]',
                name: null, // Will use textContent of the element itself
                url: null,  // Will use href of the element itself
                subs: null
            }
        ];
        
        let channelElements = [];
        let usedSelectorSet = null;
        
        // Try each selector set until we find channels
        for (const selectorSet of selectorSets) {
            channelElements = document.querySelectorAll(selectorSet.container);
            if (channelElements.length > 0) {
                usedSelectorSet = selectorSet;
                console.log(`✅ Found ${channelElements.length} channels using selector set`);
                break;
            }
        }
        
        if (channelElements.length === 0) {
            console.error('❌ No channels found. Possible reasons:');
            console.error('   • Not on the correct page (should be youtube.com/feed/channels)');
            console.error('   • YouTube changed their layout');
            console.error('   • No subscriptions exist');
            return [];
        }
        
        // Extract data from found elements
        channelElements.forEach((element, index) => {
            try {
                let name = 'Unknown Channel';
                let url = 'No URL';
                let subscribers = 'Unknown';
                
                if (usedSelectorSet.name) {
                    // Use specific selectors
                    const nameElement = element.querySelector(usedSelectorSet.name);
                    name = nameElement ? nameElement.textContent.trim() : 'Unknown Channel';
                    
                    const linkElement = element.querySelector(usedSelectorSet.url);
                    url = linkElement ? linkElement.href : 'No URL';
                    
                    if (usedSelectorSet.subs) {
                        const subsElement = element.querySelector(usedSelectorSet.subs);
                        subscribers = subsElement ? subsElement.textContent.trim() : 'Unknown';
                    }
                } else {
                    // Direct extraction from the element itself
                    name = element.textContent.trim();
                    url = element.href || 'No URL';
                }
                
                // Clean up the data
                name = name.replace(/\s+/g, ' ').trim();
                if (name && name !== 'Unknown Channel' && url !== 'No URL') {
                    channels.push({
                        name: name,
                        url: url,
                        subscribers: subscribers
                    });
                }
                
            } catch (error) {
                console.warn(`⚠️ Error extracting channel ${index + 1}:`, error);
            }
        });
        
        // Remove duplicates based on URL
        const uniqueChannels = channels.filter((channel, index, self) => 
            index === self.findIndex(c => c.url === channel.url)
        );
        
        console.log(`🎯 Successfully extracted ${uniqueChannels.length} unique channels`);
        return uniqueChannels;
    }
    
    // Execute extraction
    extractChannels().then(channels => {
        if (channels.length === 0) {
            console.error('❌ No channels extracted. Please check:');
            console.error('   1. You are on youtube.com/feed/channels');
            console.error('   2. You are logged into YouTube');
            console.error('   3. You have subscriptions');
            return;
        }
        
        console.log(`🎉 Extraction complete! Found ${channels.length} subscriptions`);
        
        // Create enhanced text formats
        const currentDate = new Date().toISOString().split('T')[0];
        const formats = {
            simple: channels.map(ch => ch.name).join('\n'),
            withUrls: channels.map(ch => `${ch.name}\n${ch.url}`).join('\n\n'),
            tabSeparated: channels.map(ch => `${ch.name}\t${ch.url}\t${ch.subscribers}`).join('\n'),
            csv: `Name,URL,Subscribers\n${channels.map(ch => `"${ch.name.replace(/"/g, '""')}","${ch.url}","${ch.subscribers}"`).join('\n')}`,
            json: JSON.stringify(channels, null, 2),
            markdown: `# YouTube Subscriptions Export\n*Exported on ${currentDate}*\n\n${channels.map(ch => `- [${ch.name}](${ch.url})`).join('\n')}`
        };
        
        // Enhanced download function
        function downloadAsFile(content, filename) {
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            console.log(`💾 Downloaded: ${filename}`);
        }
        
        // Display sample results
        console.log('\n📋 SAMPLE RESULTS (first 5 channels):');
        channels.slice(0, 5).forEach((ch, i) => {
            console.log(`${i + 1}. ${ch.name}`);
        });
        
        if (channels.length > 5) {
            console.log(`... and ${channels.length - 5} more channels`);
        }
        
        // Setup download functions
        console.log('\n💾 DOWNLOAD OPTIONS:');
        console.log('Run any of these commands to download your subscriptions:');
        console.log('');
        console.log('📝 downloadSimple()     - Channel names only (.txt)');
        console.log('🔗 downloadWithUrls()   - Names with URLs (.txt)');
        console.log('📊 downloadCsv()        - Spreadsheet format (.csv)');
        console.log('🧾 downloadJson()       - Structured data (.json)');
        console.log('📋 downloadMarkdown()   - Markdown format (.md)');
        console.log('📑 downloadTabbed()     - Tab-separated values (.tsv)');
        console.log('');
        console.log('🔄 Or run: downloadAll() to get all formats at once');
        
        // Make download functions globally available
        window.downloadSimple = () => downloadAsFile(formats.simple, `youtube_subscriptions_${currentDate}.txt`);
        window.downloadWithUrls = () => downloadAsFile(formats.withUrls, `youtube_subscriptions_with_urls_${currentDate}.txt`);
        window.downloadCsv = () => downloadAsFile(formats.csv, `youtube_subscriptions_${currentDate}.csv`);
        window.downloadJson = () => downloadAsFile(formats.json, `youtube_subscriptions_${currentDate}.json`);
        window.downloadMarkdown = () => downloadAsFile(formats.markdown, `youtube_subscriptions_${currentDate}.md`);
        window.downloadTabbed = () => downloadAsFile(formats.tabSeparated, `youtube_subscriptions_${currentDate}.tsv`);
        
        window.downloadAll = () => {
            console.log('📦 Downloading all formats...');
            downloadSimple();
            downloadWithUrls();
            downloadCsv();
            downloadJson();
            downloadMarkdown();
            downloadTabbed();
            console.log('✅ All files downloaded!');
        };
        
        // Store data for manual access
        window.subscriptionsData = channels;
        window.subscriptionsFormats = formats;
        
        // Quick copy to clipboard function
        window.copyToClipboard = (format = 'simple') => {
            const text = formats[format] || formats.simple;
            navigator.clipboard.writeText(text).then(() => {
                console.log(`📋 Copied ${format} format to clipboard!`);
            }).catch(err => {
                console.error('❌ Failed to copy to clipboard:', err);
            });
        };
        
        console.log('\n📋 BONUS: copyToClipboard("simple") - Copy to clipboard');
        console.log('Available formats: simple, withUrls, csv, json, markdown, tabSeparated');
        
    }).catch(error => {
        console.error('❌ Error during extraction:', error);
        console.error('Try refreshing the page and running the script again.');
    });
}

// Auto-run the extraction
console.log('🎬 YouTube Subscriptions Extractor v2.0');
console.log('=' .repeat(50));
extractSubscriptions();