import { BrandMark } from "@/components/common/BrandMark";

const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Careers"],
  Resources: ["Docs", "Support", "Status"],
  Legal: ["Privacy", "Terms", "Security"],
};

export function FooterSection() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-1 sm:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <BrandMark className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-slate-800 text-[14px]">Projectly</span>
            </div>
            <p className="text-[13px] text-slate-500 max-w-55">
              One workspace for every organization, team, and project.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[12.5px] font-semibold text-slate-900 mb-3">{heading}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-slate-500 hover:text-slate-900 transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-slate-100 text-center">
          <p className="text-[12px] text-slate-400">© 2026 Projectly, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}