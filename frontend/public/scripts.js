document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const elements = {
        businessModels: document.querySelectorAll('.business-model'),
        chatWidgetTitle: document.getElementById('chatWidgetTitle'),
        chatMessages: document.getElementById('chatMessages'),
        userInput: document.getElementById('userInput'),
        sendMessage: document.getElementById('sendMessage'),
        logo: document.getElementById('logo'),
        mainNav: document.body.querySelector('#mainNav')
    };

    // Add this variable to track current business model
    let currentBusinessModel = 'influencer';
    // Make it accessible to parent window
    window.currentBusinessModel = currentBusinessModel;

    // Function to select business model
    function selectBusinessModel(model) {
        // Remove active class from all models
        elements.businessModels.forEach(m => {
            const icon = m.querySelector('.business-model-icon');
            if (m === model) {
                m.classList.add('selected');
                icon.style.color = '#2937f0';
            } else {
                m.classList.remove('selected');
                icon.style.color = '';
            }
        });

        // Get the model type
        const modelType = model.querySelector('.business-model-icon').getAttribute('data-model');
        currentBusinessModel = modelType;
        // Update the global variable
        window.currentBusinessModel = currentBusinessModel;

        // Update chat background based on model type
        const chatDemo = document.querySelector('#chat-demo');
        if (chatDemo) {
            switch(modelType) {
                case 'influencer':
                    chatDemo.style.backgroundImage = 'url("assets/img/influencer.jpg")';
                    break;
                case 'themepages':
                    chatDemo.style.backgroundImage = 'url("assets/img/themepages.jpg")';
                    break;
                case 'dropshipper':
                    chatDemo.style.backgroundImage = 'url("assets/img/dropshippers.jpg")';
                    break;
                case 'community':
                    chatDemo.style.backgroundImage = 'url("assets/img/community.jpg")';
                    break;
                case 'tiktok':
                    chatDemo.style.backgroundImage = 'none';
                    break;
            }
            // Add some styling for better readability
            chatDemo.style.backgroundSize = 'cover';
            chatDemo.style.backgroundPosition = 'center';
            chatDemo.style.backgroundRepeat = 'no-repeat';
            chatDemo.style.position = 'relative';
        }
        
        // Update chat widget title
        const chatWidgetTitle = document.getElementById('chatWidgetTitle');
        let profileImage = 'logo.png';
        let agentName = 'AI Assistant';

        switch(modelType) {
            case 'themepages':
                agentName = 'Travel & Adventure';
                profileImage = 'travel.jpg';
                break;
            case 'influencer':
                agentName = 'Lilly';
                profileImage = 'influ.jpg';
                break;
            case 'dropshipper':
                agentName = 'CatToy';
                profileImage = 'store.jpg';
                break;
            case 'community':
                agentName = 'Community AI';
                break;
            case 'tiktok':
                agentName = 'TikTok AI';
                break;
        }

        if (chatWidgetTitle) chatWidgetTitle.textContent = agentName;

        // Update profile image
        const headerProfileImage = document.querySelector('.card-header .rounded-circle');
        if (headerProfileImage) {
            headerProfileImage.src = `assets/img/${profileImage}`;
        }

        // Clear chat messages
        elements.chatMessages.innerHTML = '';
        
        // Add initial message based on business model
        let initialMessage;
        switch(modelType) {
            case 'themepages':
                initialMessage = `
                    <div class="message-content">
                        <p>Hey!! Welcome to our theme page, Travel & Adventure Photography, we have a 20% off sale on our digital travel guide eBook now!!</p>
                        <div class="carousel-container mt-3 mb-3">
                            <div class="message-carousel">
                                <img src="assets/img/themehat.jpg" alt="Theme Pages Solutions" class="carousel-image">
                            </div>
                        </div>
                    </div>`;
                break;
            case 'influencer':
                initialMessage = `
                    <div class="message-content">
                        <p>Hi there! I'm Lily Summers AI, your Lifestyle Influencer. do you want to get a phone call from me?</p>
                        <div class="carousel-container mt-3 mb-3">
                            <div class="message-carousel">
                                <img src="assets/img/influencerchat.jpg" alt="Influencer Marketing" class="carousel-image">
                            </div>
                        </div>
                    </div>`;
                break;
            case 'community':
                initialMessage = `
                    <div class="message-content">
                        <p>Welcome to Automind's Community! I'm here to teach you how to build a community, engage, and grow your online community.</p>
                        <div class="carousel-container mt-3 mb-3">
                            <div class="message-carousel">
                                <img src="assets/img/communitychat.jpg" alt="Community Management" class="carousel-image">
                            </div>
                        </div>
                    </div>`;
                break;
            case 'tiktok':
                initialMessage = `
                    <div class="message-content">
                        <p>Hey! Tiktok AI is Not available yet, but we will let you know when it's ready</p>
                        <div class="carousel-container mt-3 mb-3">
                            <div class="message-carousel">
                                <img src="assets/img/tiktok.jpg" alt="TikTok Growth" class="carousel-image">
                            </div>
                        </div>
                    </div>`;
                break;
            default: // dropshippers
                initialMessage = `
                    <div class="message-content">
                        <p>Hey there! 👋 Welcome to our store! Check out our hot seller—the Interactive Laser & Feather Cat Toy! 🐾Let me know if you'd like to get a PROMO CODE throw a phone call from me!</p>
                        <div class="carousel-container mt-3 mb-3">
                            <div class="message-carousel">
                                <img src="assets/img/product.jpg" alt="Dropshipping Solutions" class="carousel-image">
                            </div>
                        </div>
                    </div>`;
        }
        
        // Add the initial message
        addBotMessage(initialMessage);
    }

    // Add click handlers for business models
    elements.businessModels.forEach(model => {
        model.addEventListener('click', () => selectBusinessModel(model));
    });

    // Initialize with default business model
    const defaultModel = document.querySelector('.business-model-icon[data-model="influencer"]')?.closest('.business-model');
    if (defaultModel) selectBusinessModel(defaultModel);

    // Chat Functions
    function handleUserInput() {
        const message = elements.userInput.value.trim();
        if (message) {
            addUserMessage(message);
            elements.userInput.value = '';
            
            // Send message to parent window (LandingPage component)
            window.parent.postMessage({
                type: 'chatMessage',
                message: message
            }, '*');
        }
    }

    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'mb-3 d-flex justify-content-end';
        messageElement.innerHTML = `
            <div class="message-bubble user-message">${message}</div>
        `;
        elements.chatMessages.appendChild(messageElement);
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    }

    function addBotMessage(content) {
        const messageElement = document.createElement('div');
        messageElement.className = 'mb-3 d-flex align-items-start flex-column';
        
        const bubbleContent = `
            <div class="d-flex align-items-end">
                <img src="assets/img/logo.png" alt="AI Agent" class="rounded-circle me-2" style="width: 28px; height: 28px;">
                <div class="message-bubble bot-message">${content}</div>
            </div>`;

        messageElement.innerHTML = bubbleContent;
        elements.chatMessages.appendChild(messageElement);
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    }

    // Add message listener for responses
    window.addEventListener('message', function(event) {
        if (event.data.type === 'chatResponse') {
            addBotMessage(event.data.content);
        } else if (event.data.type === 'chatError') {
            addBotMessage(event.data.content);
        }
    });

    // Event Listeners for Chat
    if (elements.sendMessage) {
        elements.sendMessage.addEventListener('click', handleUserInput);
    }

    if (elements.userInput) {
        elements.userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleUserInput();
            }
        });
    }

    // Logo hover effect
    const logo = document.getElementById('navbar-logo');
    if (logo) {
        const originalSrc = 'assets/img/logo.png';
        const hoverSrc = 'assets/img/logo2.jpg';
        
        logo.addEventListener('mouseenter', function() {
            this.src = hoverSrc;
        });
        
        logo.addEventListener('mouseleave', function() {
            this.src = originalSrc;
        });
    }

    // Bootstrap ScrollSpy
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        const spy = new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
            threshold: [0.4, 0.6],
            offset: 100
        });

        // Refresh ScrollSpy after dynamic content loads
        setTimeout(() => {
            spy.refresh();
        }, 1000);
    }

    // WhatsApp QR Widget Functions
    window.showQRWidget = function() {
        const widget = document.getElementById('whatsappQRWidget');
        if (widget) {
            widget.style.display = 'block';
            widget.style.opacity = '0';
            setTimeout(() => {
                widget.style.opacity = '1';
                widget.style.transition = 'opacity 0.3s ease';
            }, 10);
        }
    };

    window.closeQRWidget = function() {
        const widget = document.getElementById('whatsappQRWidget');
        if (widget) {
            widget.style.opacity = '0';
            widget.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                widget.style.display = 'none';
            }, 300);
        }
    };

    // Close widget when clicking outside
    document.addEventListener('click', function(event) {
        const widget = document.getElementById('whatsappQRWidget');
        const whatsappBubble = document.querySelector('.bubble-whatsapp');
        
        if (widget && widget.style.display === 'block' && 
            !widget.contains(event.target) && 
            !whatsappBubble.contains(event.target)) {
            window.closeQRWidget();
        }
    });

    // Video Player functionality
    const video = document.getElementById('heroVideo');
    const mainPlayButton = document.createElement('div');
    mainPlayButton.className = 'play-button-overlay';
    mainPlayButton.innerHTML = '<i class="fas fa-play"></i>';

    // Add play/pause button to video container
    if (video) {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        video.parentNode.insertBefore(videoContainer, video);
        videoContainer.appendChild(video);
        videoContainer.appendChild(mainPlayButton);

        // Toggle play/pause on video click
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                mainPlayButton.classList.add('hidden');
            } else {
                video.pause();
                mainPlayButton.classList.remove('hidden');
            }
        });

        // Handle play button click
        mainPlayButton.addEventListener('click', function() {
            video.play()
                .then(() => {
                    video.muted = false;
                    mainPlayButton.classList.add('hidden');
                })
                .catch(error => {
                    console.log("Video playback failed:", error);
                });
        });

        // Show play button when video is paused
        video.addEventListener('pause', function() {
            mainPlayButton.classList.remove('hidden');
        });

        // Hide play button when video is playing
        video.addEventListener('play', function() {
            mainPlayButton.classList.add('hidden');
        });
    }

    // Video detachment functionality
    const initVideoDetachment = () => {
        const floatingContainer = document.getElementById('floating-video-container');
        const closeButton = document.getElementById('close-floating-video');
        const floatingVideo = document.getElementById('floating-video');
        
        if (!floatingContainer || !closeButton || !floatingVideo) {
            console.warn('One or more video elements not found');
            return;
        }

        let isDetached = false;
        let isStopped = false;

        // Add click handler for floating video with sound control
        floatingVideo.addEventListener('click', function() {
            if (this.paused) {
                this.play();
                this.muted = false; // Unmute when playing
            } else {
                this.pause();
            }
        });

        // Handle scroll event with debouncing
        let scrollTimeout;
        const scrollHandler = () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }

            scrollTimeout = window.requestAnimationFrame(() => {
                if (isStopped) return;

                const scrollPosition = window.scrollY;
                
                // Show floating video after scrolling down 300px
                if (!isDetached && scrollPosition > 300) {
                    floatingContainer.style.display = 'block';
                    setTimeout(() => {
                        floatingContainer.classList.add('visible');
                    }, 10);
                    floatingVideo.play()
                        .then(() => {
                            floatingVideo.muted = false;
                        })
                        .catch(error => console.log("Floating video playback failed:", error));
                    isDetached = true;
                } else if (isDetached && scrollPosition <= 300) {
                    floatingContainer.classList.remove('visible');
                    setTimeout(() => {
                        floatingContainer.style.display = 'none';
                    }, 300);
                    floatingVideo.pause();
                    isDetached = false;
                }
            });
        };

        // Handle close button
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling
            floatingContainer.classList.remove('visible');
            setTimeout(() => {
                floatingContainer.style.display = 'none';
            }, 300);
            isDetached = false;
            isStopped = true;
            floatingVideo.pause();
        });

        // Add scroll event listener
        window.addEventListener('scroll', scrollHandler, { passive: true });
    };

    // Initialize video detachment after DOM content is loaded
    initVideoDetachment();

    // Video playback functionality
    const heroVideo = document.getElementById('heroVideo');
    const playButton = document.querySelector('.video-play-button');

    if (heroVideo && playButton) {
        playButton.addEventListener('click', function() {
            heroVideo.play()
                .then(() => {
                    heroVideo.muted = false;  // Unmute after play starts
                    playButton.classList.add('hidden');
                })
                .catch(error => {
                    console.log("Video playback failed:", error);
                });
        });

        // Show play button again when video ends
        heroVideo.addEventListener('ended', function() {
            playButton.classList.remove('hidden');
            heroVideo.currentTime = 0;  // Reset video to start
        });

        // Pause video if user navigates away from tab
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                heroVideo.pause();
                playButton.classList.remove('hidden');
            }
        });
    }

    // Add these chat starter functions
    function startThemeChat() {
        addUserMessage("I want to optimize my theme for better conversions");
        handleUserInput();
    }

    function startInfluencerChat() {
        addUserMessage("Help me grow my social media presence");
        handleUserInput();
    }

    function startCommunityChat() {
        addUserMessage("I need help building an engaged community");
        handleUserInput();
    }

    function startTikTokChat() {
        addUserMessage("How can I create viral TikTok content?");
        handleUserInput();
    }

    function startDropshippingChat() {
        addUserMessage("I want to scale my dropshipping store");
        handleUserInput();
    }

    // Update the toggle function
    function toggleChatWidget() {
        let chatContainer = document.querySelector('.vg-container');
        
        if (!chatContainer) {
            if (!window.VG_SCRIPT_LOADED) {
                // Load configuration from backend
                fetch('/api/widget-config')
                    .then(response => response.json())
                    .then(config => {
                        window.VG_CONFIG = config;
                        
                        const script = document.createElement("script");
                        script.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
                        script.onload = function() {
                            window.VG_SCRIPT_LOADED = true;
                            setTimeout(toggleChatWidget, 100);
                        };
                        document.body.appendChild(script);
                    })
                    .catch(error => {
                        console.error('Error loading widget config:', error);
                    });
                return;
            }
            return;
        }

        // Toggle the chat container visibility
        if (window.getComputedStyle(chatContainer).display === 'none') {
            chatContainer.style.display = 'block';
            chatContainer.style.position = 'fixed';
            chatContainer.style.right = '80px';
            chatContainer.style.bottom = '20px';
            chatContainer.style.width = '400px';
            chatContainer.style.height = '600px';
            chatContainer.style.zIndex = '1000';
        } else {
            chatContainer.style.display = 'none';
        }
    }

    const slider = document.querySelector('.global-credit-slider');
    const extraCreditsEl = document.querySelector('.extra-credits');
    const extraCostEl = document.querySelector('.extra-cost');
    const totalCostEl = document.querySelector('.total-cost');
    const planButtons = document.querySelectorAll('.plan-select');
    
    // Initialize with the currently selected plan's price
    let selectedPlanPrice = parseFloat(document.querySelector('.plan-select.btn-primary')?.dataset.price) || 0;

    // Handle plan selection
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            planButtons.forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
                btn.closest('.pricing-card')?.classList.remove('selected');
            });
            
            // Add active class to selected button
            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-primary');
            this.closest('.pricing-card')?.classList.add('selected');
            
            // Update selected plan price
            selectedPlanPrice = parseFloat(this.dataset.price) || 0;
            
            // Update total with current extra credits
            updateTotal();
        });
    });

    // Handle slider changes
    if (slider) {
        slider.addEventListener('input', function() {
            updateTotal();
        });
    }

    function updateTotal() {
        const extraCredits = parseInt(slider.value);
        const extraCost = (extraCredits * 0.006);
        const total = (extraCost + selectedPlanPrice).toFixed(2);
        
        extraCreditsEl.textContent = `${extraCredits.toLocaleString()} extra credits`;
        extraCostEl.textContent = `$${extraCost.toFixed(2)}`;
        totalCostEl.textContent = `$${total}`;
    }
});

function scheduleAICall(formData) {
    // Replace this with your actual API call
    return new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });
}

function showSuccessMessage() {
    Swal.fire({
        icon: 'success',
        title: 'Call Scheduled!',
        text: 'Our AI assistant will call you shortly.',
        confirmButtonColor: '#2937f0'
    });
}

function showErrorMessage(error) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again.',
        confirmButtonColor: '#2937f0'
    });
}

function resetForm(form, button, originalContent) {
    form.reset();
    form.classList.remove('was-validated');
    button.innerHTML = originalContent;
    button.disabled = false;
}

function initRippleEffect(form) {
    const button = form.querySelector('button');
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        button.querySelector('.ripple-container').appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1000);
    });
}




