document.addEventListener("DOMContentLoaded", () => {
    const archiveGrid = document.getElementById("archive-grid");

    /* ── ÖĞRENCİ VERİTABANI ──
       Yeni bir proje eklendiğinde sadece buraya bir blok ekleyin. 
       Klasör adı (folder) birebir eşleşmelidir. */
    const students = [
        {
            folder: "oguz", // Öğrencinin klasörünün tam adı
            name: "Oğuz Ülgen Tunç",
            title: "IEU Academic Staff Flower Spiral"
        },
        {
            folder: "utku",
            name: "Utku Genius",
            title: "Örnek Veri Görselleştirme Projesi"
        },
        {
            folder: "ata",
            name: "Ata The Leader",
            title: "Örnek Veri Görselleştirme Projesi"
        },
        // Yeni öğrencileri buraya virgülle eklemeye devam edebilirsin...
    ];

    /* 1. HTML'İ OTOMATİK OLUŞTURMA */
    students.forEach((student) => {
        const item = document.createElement("a");
        // ARTIK DOĞRUDAN KLASÖRE DEĞİL, WRAPPER'A GİDİYOR
        item.href = `project.html?p=${student.folder}`;
        item.className = "project-item";

        // onerror: Eğer öğrenci henüz thumbnail.png koymamışsa sayfa bozulmasın diye gri kutu koyar
        item.innerHTML = `
            <img src="${student.folder}/thumbnail.png" alt="${student.name} Projesi" 
                 onerror="this.onerror=null; this.src='https://via.placeholder.com/800x1000/2A2A2A/555555?text=Gorsel+Bekleniyor';">
            <div class="overlay">
                <h2>${student.name}</h2>
                <p>${student.title}</p>
            </div>
        `;

        archiveGrid.appendChild(item);
    });

    /* 2. ZARİF BELİRME ANİMASYONLARI (Eski kodunun aynısı) */
    const projects = document.querySelectorAll(".project-item");

    projects.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, index * 100);
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    projects.forEach(project => {
        observer.observe(project);
    });
});