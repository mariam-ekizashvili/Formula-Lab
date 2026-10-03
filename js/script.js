function getLocation() {
        const status = document.getElementById('status');
        const coordsInput = document.getElementById('coords');
        const mapUrlInput = document.getElementById('map_url');

        if (!navigator.geolocation) {
            status.innerText = "გეოლოკაციის მხარდაჭერა არ არის.";
            return;
        }

        status.style.color = "#333";
        status.innerText = "ლოკაცია იძებნება...";

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const accuracy = Math.round(position.coords.accuracy);

                coordsInput.value = `${lat}, ${lng}`;
                mapUrlInput.value = `https://maps.google.com/?q=${lat},${lng}`;

                status.innerText = `ლოკაცია დაფიქსირდა (ცდომილება: ~${accuracy}მ)`;
            },
            (error) => {
                status.innerText = "ლოკაციის მიღება ვერ მოხერხდა. ჩართეთ GPS.";
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    }

    const form = document.getElementById("my-form");
    const formStatus = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");

    async function handleSubmit(event) {
        event.preventDefault();
        
        const data = new FormData(event.target);
        
        submitBtn.disabled = true;
        formStatus.innerText = "იგზავნება...";

        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                formStatus.innerText = "მადლობა! შეკვეთა წარმატებით გაიგზავნა.";
                form.reset();
                document.getElementById('status').innerText = "";
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerText = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.innerText = "შეცდომა გაგზავნისას. სცადეთ ხელახლა.";
                    }
                })
            }
        }).catch(error => {
            formStatus.innerText = "კავშირის შეცდომა. შეამოწმეთ ინტერნეტი.";
        }).finally(() => {
            submitBtn.disabled = false;
        });
    }

    form.addEventListener("submit", handleSubmit);