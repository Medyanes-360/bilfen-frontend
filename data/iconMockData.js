/**
 * Material Icons Mock Data
 *
 * This file contains icon mappings for different material types and file formats.
 */

// Material type icons (emoji style)
export const MATERIAL_TYPE_ICONS = {
    // Primary material types
    document: "📄",
    video: "🎬",
    game: "🎮",
    quiz: "📝",
    exercise: "✏️",
    presentation: "📊",
    audio: "🎵",
    image: "🖼️",
    link: "🔗",
    book: "📚",
  
    // Specific subject icons
    math: "🔢",
    science: "🔬",
    language: "🔤",
    history: "🏛️",
    geography: "🌍",
    art: "🎨",
    music: "🎵",
    sports: "⚽",
  
    // Default icon if type not found
    default: "📑",
  }
  
  // File format icons (emoji style)
  export const FILE_FORMAT_ICONS = {
    // Document formats
    pdf: "📕",
    doc: "📘",
    docx: "📘",
    txt: "📝",
    rtf: "📄",
  
    // Spreadsheet formats
    xls: "📊",
    xlsx: "📊",
    csv: "📊",
  
    // Presentation formats
    ppt: "📊",
    pptx: "📊",
  
    // Media formats
    mp4: "🎬",
    mov: "🎬",
    avi: "🎬",
    webm: "🎬",
    mp3: "🎵",
    wav: "🎵",
    jpg: "🖼️",
    jpeg: "🖼️",
    png: "🖼️",
    gif: "🖼️",
  
    // Archive formats
    zip: "🗄️",
    rar: "🗄️",
  
    // Default icon if format not found
    default: "📄",
  }
  
  // Material status icons
  export const MATERIAL_STATUS_ICONS = {
    new: "🆕",
    completed: "✅",
    inProgress: "⏳",
    locked: "🔒",
    favorite: "⭐",
    important: "❗",
    optional: "💡",
  }
  
  /**
   * Get the appropriate icon for a material based on its type
   * @param {string} type - The material type
   * @returns {string} - The corresponding emoji icon
   */
  export const getMaterialTypeIcon = (type) => {
    return MATERIAL_TYPE_ICONS[type?.toLowerCase()] || MATERIAL_TYPE_ICONS.default
  }
  
  /**
   * Get the appropriate icon for a file based on its extension
   * @param {string} filename - The filename or URL
   * @returns {string} - The corresponding emoji icon
   */
  export const getFileFormatIcon = (filename) => {
    if (!filename) return FILE_FORMAT_ICONS.default
  
    const extension = filename.split(".").pop()?.toLowerCase()
    return FILE_FORMAT_ICONS[extension] || FILE_FORMAT_ICONS.default
  }
  
  /**
   * Get the appropriate icon for a material based on its type and file format
   * @param {Object} material - The material object
   * @returns {string} - The most appropriate emoji icon
   */
  export const getMaterialIcon = (material) => {
    if (!material) return MATERIAL_TYPE_ICONS.default
  
    // If it's a video, use video icon regardless of file extension
    if (material.type?.toLowerCase() === "video") {
      return MATERIAL_TYPE_ICONS.video
    }
  
    // If it's a game, use game icon
    if (material.type?.toLowerCase() === "game") {
      return MATERIAL_TYPE_ICONS.game
    }
  
    // If it's a quiz, use quiz icon
    if (material.type?.toLowerCase() === "quiz") {
      return MATERIAL_TYPE_ICONS.quiz
    }
  
    // For documents, check the file extension first
    const url = material.url || material.content
    if (url) {
      const fileIcon = getFileFormatIcon(url)
      if (fileIcon !== FILE_FORMAT_ICONS.default) {
        return fileIcon
      }
    }
  
    // Fall back to type icon
    return getMaterialTypeIcon(material.type)
  }
  
  // Subject-specific icon sets for more specialized use cases
  export const SUBJECT_ICONS = {
    mathematics: {
      general: "🔢",
      algebra: "📊",
      geometry: "📐",
      calculus: "📈",
      statistics: "📉",
    },
    science: {
      general: "🔬",
      biology: "🧬",
      chemistry: "⚗️",
      physics: "⚛️",
      astronomy: "🔭",
    },
    languages: {
      general: "🔤",
      grammar: "📝",
      vocabulary: "📚",
      reading: "📖",
      writing: "✍️",
    },
    socialStudies: {
      general: "🌍",
      history: "🏛️",
      geography: "🗺️",
      civics: "⚖️",
      economics: "💰",
    },
}
  