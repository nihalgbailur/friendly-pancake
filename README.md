# YouTube Subscription Extractor & Bookmarks Generator

A powerful JavaScript tool to extract your YouTube channel subscriptions and convert them into organized Chrome bookmarks.

## 🚀 Features

- **Extract All Subscriptions**: Automatically scrapes all your YouTube channel subscriptions
- **Multiple Export Formats**: Simple list, detailed with URLs, CSV, and JSON formats
- **Organized Bookmarks**: Pre-categorized bookmarks ready for Chrome import
- **Creative Categories**: Channels organized into meaningful groups like "Knowledge Navigators", "Creative Corners", etc.
- **No External Dependencies**: Pure JavaScript solution that runs in your browser

## 📋 Usage Instructions

### Step 1: Extract Your Subscriptions
1. Go to `youtube.com/feed/channels`
2. Open Developer Tools (F12) → Console tab
3. Paste the entire script from `script.js` and press Enter
4. Wait for extraction to complete
5. Use any download command (e.g., `downloadSimple()`)

### Step 2: Import Bookmarks (Optional)
1. Save the `bookmarks.html` file to your computer
2. Open Chrome → Bookmarks → Bookmark Manager (Ctrl+Shift+O)
3. Click the three dots menu (⋮) → Import bookmarks
4. Select your saved `bookmarks.html` file
5. Your channels will appear organized in bookmark folders!

## 🛠️ Available Functions

After running the script, you can use these commands in the console:

### Download Functions
```javascript
downloadSimple()           // Simple channel names list
downloadWithUrls()         // Channel names with URLs
downloadCsv()             // CSV format for spreadsheets
downloadJson()            // JSON format for developers
```

### Display Functions
```javascript
displayChannels()         // Show all channels in console
displayStats()           // Show extraction statistics
```

## 📁 File Structure

```
├── script.js           # Main extraction script
├── bookmarks.html      # Pre-organized Chrome bookmarks
└── README.md          # This file
```

## 🎯 Categories in Bookmarks

The `bookmarks.html` file organizes channels into these creative categories:

- **🧭 Knowledge Navigators**: Educational, tech, and tutorial channels
- **🎨 Creative Corners**: Art, design, and photography channels
- **🎬 Entertainment Escapades**: Movies, gaming, and comedy channels
- **✈️ Exploration Stations**: Travel and cultural content
- **🧘 Wellness Waves**: Meditation, ASMR, and wellness channels
- **🍳 Culinary Quests**: Food and cooking channels
- **🙏 Spiritual Sojourns**: Spiritual and philosophical content

## 🔧 How It Works

1. **Extraction**: The script scrolls through your YouTube subscriptions page
2. **Data Collection**: Captures channel names, URLs, and subscriber counts
3. **Processing**: Organizes data into multiple formats
4. **Export**: Provides various download options via browser's download API

## 📊 Output Formats

### Simple List Format
```
Channel Name 1
Channel Name 2
Channel Name 3
```

### Detailed Format with URLs
```
Channel Name 1 - https://www.youtube.com/@channel1
Channel Name 2 - https://www.youtube.com/@channel2
```

### CSV Format
```csv
Channel Name,URL,Subscriber Count
Channel 1,https://www.youtube.com/@channel1,1.2M subscribers
Channel 2,https://www.youtube.com/@channel2,500K subscribers
```

### JSON Format
```json
[
  {
    "name": "Channel Name",
    "url": "https://www.youtube.com/@channel",
    "subscribers": "1.2M subscribers"
  }
]
```

## 🚨 Important Notes

- **Login Required**: You must be logged into your YouTube account
- **Subscription Privacy**: Only works with your own subscriptions
- **Browser Compatibility**: Works in modern browsers (Chrome, Firefox, Safari, Edge)
- **Rate Limiting**: Script includes delays to avoid overwhelming YouTube's servers
- **Data Privacy**: All processing happens locally in your browser

## 🐛 Troubleshooting

### Script Not Working?
- Ensure you're on the correct page: `youtube.com/feed/channels`
- Make sure you're logged into YouTube
- Try refreshing the page and running the script again
- Check if Developer Tools console shows any errors

### No Channels Found?
- Verify you have YouTube subscriptions
- Make sure the subscriptions page has fully loaded
- Try scrolling down manually to load more channels first

### Download Not Starting?
- Check if your browser blocks automatic downloads
- Look for download permission prompts
- Ensure popup blockers aren't interfering

## 🔄 Version History

- **v1.0.0**: Initial release with extraction and multiple export formats
- **v1.1.0**: Added bookmark generation and creative categorization

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## ⭐ Show Your Support

If this tool helped you organize your YouTube subscriptions, please give it a star!

---

**Happy organizing! 🎉**
