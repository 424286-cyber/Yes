// General Constants
const STRUCTURE_URL = "Structure.json"
const IFRAME_DEFAULT_PAGE = "Content/Pages/HomePage.html"

// Link Specific Constants
const LINK_CLASSNAME = "ViewportSwitchButton"
const LINK_TARGET = "CentralIFrame"
const DEFAULT_PAGE_URL = "Content/Defaults/DefaultPage.html"

// Category Specific Constants



// Function called at Document Loaded
async function loadStructure() {
  try {
    // Sets the default page of the IFrame
    const IFrameElement = document.getElementsByClassName("Main-Content")[0]

    if (IFrameElement) {
      IFrameElement.src = IFRAME_DEFAULT_PAGE
    }


    // Reading from the Structure file
    const Response = await fetch(STRUCTURE_URL)
    const Data = await Response.json()
    const SidebarContent = document.querySelector(".Sidebar-Content")

    if (SidebarContent) {
      SidebarContent.innerHTML = ""
      renderMenuItems(Data.Structure, SidebarContent)
    }

  // We need to catch those errors
  } catch (CaughtError) {
    console.error("Error loading structure: ", CaughtError)
  }
}


// Rendering frames from the Structure
function renderMenuItems(items, container) {
  items.forEach((item, index) => {
    // If the item found is a Link
    if (item.Type === "Link") {
      const LinkObject = document.createElement("a")

      LinkObject.className = LINK_CLASSNAME
      LinkObject.href = item.href || DEFAULT_PAGE_URL
      LinkObject.textContent = item.Name || "Name Undefined"
      LinkObject.target = LINK_TARGET

      container.appendChild(LinkObject)

    
      // If the item found is a Category
    } else if (item.Type === "Category") {
      const categoryDiv = document.createElement("div")
      categoryDiv.className = "CategoryDropdown"

      const categoryButton = document.createElement("button")
      categoryButton.className = "CategoryButton"
      categoryButton.textContent = `${item.Name} ▼`

      const itemsContainer = document.createElement("div")
      itemsContainer.className = "CategoryItems"
      itemsContainer.style.display = "none"

      categoryButton.addEventListener("click", () => {
        const isVisible = itemsContainer.style.display !== "none"
        itemsContainer.style.display = isVisible ? "none" : "block"
        categoryButton.textContent = isVisible
          ? `${item.Name} ▼`
          : `${item.Name} ▲`
      })

      categoryDiv.appendChild(categoryButton)
      categoryDiv.appendChild(itemsContainer)
      container.appendChild(categoryDiv)

      // Check if the Category has any links, if so then render them
      if (item.Children && item.Children.length > 0) {
        renderMenuItems(item.Children, itemsContainer)
      }
    }
  })
}

// When the document loads, call the function to load the structure
document.addEventListener("DOMContentLoaded", loadStructure)